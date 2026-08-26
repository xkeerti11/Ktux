import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';

// Configure DNS resolution at module load time to handle Windows ISP DNS SRV lookup issues for mongodb+srv://
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch {
  // ignore if setting custom DNS is restricted
}

let isConnected = false;
let memoryServer: { getUri: () => string; stop: () => Promise<boolean | void> } | undefined;

async function resolveSrvToDirectUri(srvUri: string): Promise<string | null> {
  try {
    const match = srvUri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]*)(?:\?(.*))?$/);
    if (!match) return null;
    const [, user, pass, hostname, dbName, queryParams] = match;
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    const srvRecords = await dns.promises.resolveSrv(`_mongodb._tcp.${hostname}`);
    if (!srvRecords || srvRecords.length === 0) return null;
    const hosts = srvRecords.map(r => `${r.name}:${r.port}`).join(',');
    const txtRecords = await dns.promises.resolveTxt(hostname).catch(() => []);
    const txtParams = txtRecords.flat().join('&');
    const allParams = [txtParams, queryParams, 'ssl=true'].filter(Boolean).join('&');
    return `mongodb://${user}:${pass}@${hosts}/${dbName}?${allParams}`;
  } catch {
    return null;
  }
}

export async function connectDatabase(): Promise<boolean> {
  const targetUri = env.MONGODB_URI;
  try {
    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    });
    isConnected = true;
    logger.info('MongoDB connected successfully', { uri: targetUri.replace(/:([^@]+)@/, ':****@') });
    return true;
  } catch (err: any) {
    if (targetUri.startsWith('mongodb+srv://') || err?.message?.includes('querySrv')) {
      logger.info('SRV lookup issue detected. Resolving MongoDB Atlas SRV via public DNS...');
      const directUri = await resolveSrvToDirectUri(targetUri);
      if (directUri) {
        try {
          if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
          await mongoose.connect(directUri, {
            serverSelectionTimeoutMS: 8000,
            maxPoolSize: 10,
          });
          isConnected = true;
          logger.info('MongoDB connected successfully via direct Atlas seedlist', { uri: directUri.replace(/:([^@]+)@/, ':****@') });
          return true;
        } catch (directErr: any) {
          logger.warn('Direct Atlas seedlist connection attempt failed', { error: directErr?.message });
        }
      }
    }

    if (env.NODE_ENV !== 'production') {
      logger.warn('MongoDB connection to MONGODB_URI failed. Attempting MongoMemoryServer fallback...', { error: err?.message });
      try {
        if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
        // @ts-ignore - dynamic development fallback only
        const memModule = await import('' + 'mongodb-memory-server').catch(() => null);
        if (memModule && memModule.MongoMemoryServer) {
          const instance = await memModule.MongoMemoryServer.create();
          memoryServer = instance;
          const uri = instance.getUri();
          await mongoose.connect(uri);
          isConnected = true;
          logger.info('MongoMemoryServer fallback connected successfully!', { uri });
          return true;
        }
      } catch (memErr: any) {
        logger.warn('MongoMemoryServer fallback skipped or unavailable', { error: memErr?.message });
      }
    }

    isConnected = false;
    await mongoose.disconnect().catch(() => undefined);
    logger.error('Failed to connect to MongoDB', { error: err?.message });
    logger.warn('Database-dependent features are disabled until MongoDB is available. Configure a reachable MONGODB_URI.');
    return false;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
  if (memoryServer) {
    await memoryServer.stop().catch(() => undefined);
    memoryServer = undefined;
  }
}

export function isDatabaseReady(): boolean {
  return mongoose.connection.readyState === 1;
}
