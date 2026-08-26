import crypto from 'node:crypto';
import { env } from '../config/env';
import { AppError } from '../utils/errors';

export function createCloudinaryUploadSignature(input: { folder: string; timestamp: number; resourceType: 'image' | 'raw' }) {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new AppError(503, 'MEDIA_NOT_CONFIGURED', 'Media storage is not configured');
  }
  const params = `folder=${encodeURIComponent(input.folder)}&resource_type=${input.resourceType}&timestamp=${input.timestamp}`;
  const signature = crypto.createHash('sha1').update(`${params}${env.CLOUDINARY_API_SECRET}`).digest('hex');
  return { cloudName: env.CLOUDINARY_CLOUD_NAME, apiKey: env.CLOUDINARY_API_KEY, timestamp: input.timestamp, folder: input.folder, resourceType: input.resourceType, signature };
}
