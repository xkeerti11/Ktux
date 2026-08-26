import { client } from './client';
import type { AnalyticsSummary, ApiEnvelope, BlogPost, CaseStudy, ChatResult, Consultation, Lead, Pagination, UploadSignature } from './types';

export async function sendChat(input: { message: string; sessionId?: string }) {
  const response = await client.post<ApiEnvelope<ChatResult>>('/ai/chat', input);
  return response.data.data;
}


export async function getEstimate(params: { pages: number; ecommerce: boolean; aiFeatures: boolean }) {
  const response = await client.get<ApiEnvelope<{ currency: string; min: number; max: number; assumptions: typeof params }>>('/ai/estimate', { params });
  return response.data.data;
}

export async function getAnalytics(params?: { from?: string; to?: string }) {
  const response = await client.get<ApiEnvelope<AnalyticsSummary>>('/analytics/summary', { params });
  return response.data.data;
}

export async function getLeads(params: Record<string, string | number | undefined>) {
  const response = await client.get<ApiEnvelope<Lead[]> & { pagination: Pagination }>('/leads', { params });
  return response.data;
}

export async function getConsultations(params?: { page?: number; limit?: number; status?: string }) {
  const response = await client.get<ApiEnvelope<Consultation[]> & { pagination: Pagination }>('/consultations', { params });
  return response.data;
}

export async function listBlogPosts(params?: Record<string, string | number | boolean | undefined>) {
  const response = await client.get<ApiEnvelope<BlogPost[]> & { pagination: Pagination }>('/blog/posts', { params });
  return response.data;
}

export async function listCaseStudies(params?: Record<string, string | number | undefined>) {
  const response = await client.get<ApiEnvelope<CaseStudy[]> & { pagination: Pagination }>('/case-studies', { params });
  return response.data;
}

export async function getBlogPost(slug: string) {
  const response = await client.get<ApiEnvelope<BlogPost>>(`/blog/posts/${slug}`);
  return response.data.data;
}

export async function getCaseStudy(slug: string) {
  const response = await client.get<ApiEnvelope<CaseStudy>>(`/case-studies/${slug}`);
  return response.data.data;
}

export async function presignUpload(input: { folder: string; resourceType: 'image' | 'raw' }) {
  const response = await client.post<ApiEnvelope<UploadSignature>>('/media/presign', input);
  return response.data.data;
}

export async function uploadToCloudinary(file: File, signature: UploadSignature) {
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', signature.apiKey);
  form.append('timestamp', String(signature.timestamp));
  form.append('folder', signature.folder);
  form.append('signature', signature.signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/${signature.resourceType}/upload`, { method: 'POST', body: form });
  const data = await response.json() as { secure_url?: string; url?: string };
  if (!data.secure_url && !data.url) throw new Error('Cloudinary did not return an image URL');
  return data.secure_url ?? data.url!;
}

export async function runAudit(url: string) {
  const response = await client.post<ApiEnvelope<{ result?: { text?: string }; text?: string }>>('/ai/audit', { url });
  return response.data.data;
}


