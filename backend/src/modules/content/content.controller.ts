import type { Request, Response } from 'express';
import { BlogPost } from '../../models/BlogPost';
import { CaseStudy } from '../../models/CaseStudy';
import { AppError } from '../../utils/errors';
import { paginationMeta } from '../../utils/pagination';
import { sanitizeContent } from '../../utils/content';
import { stringParam } from '../../utils/request';
import { validated } from '../../utils/validated';

function contentFilter(query: Record<string, unknown>, type: 'blog' | 'case') {
  const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const filter: Record<string, unknown> = { isDeleted: false };
  if (query.search) filter.$or = [{ title: new RegExp(escapeRegex(String(query.search)), 'i') }, ...(type === 'blog' ? [{ excerpt: new RegExp(escapeRegex(String(query.search)), 'i') }] : [])];
  if (query.category && type === 'blog') filter.category = query.category;
  if (query.industry && type === 'case') filter.industryTag = query.industry;
  return filter;
}

export async function listBlogPosts(req: Request, res: Response): Promise<void> {
  const q = validated<{ page: number; limit: number; search?: string; category?: string; published?: string }>(req, 'query');
  const filter = contentFilter(q as never, 'blog');
  filter.published = q.published === 'false' ? false : true;
  const [data, total] = await Promise.all([BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(), BlogPost.countDocuments(filter)]);
  res.json({ success: true, data, pagination: paginationMeta(q.page, q.limit, total) });
}

export async function getBlogPost(req: Request, res: Response): Promise<void> {
  const post = await BlogPost.findOne({ slug: stringParam(req.params.slug, 'slug'), isDeleted: false, published: true }).lean();
  if (!post) throw new AppError(404, 'NOT_FOUND', 'Blog post not found');
  await BlogPost.updateOne({ _id: post._id }, { $inc: { views: 1 } });
  res.json({ success: true, data: post });
}

export async function createBlogPost(req: Request, res: Response): Promise<void> {
  const post = await BlogPost.create({ ...req.body, content: sanitizeContent(req.body.content), authorId: req.auth!.id, publishedAt: req.body.published ? new Date() : undefined, isDeleted: false });
  res.status(201).json({ success: true, data: post });
}

export async function updateBlogPost(req: Request, res: Response): Promise<void> {
  const post = await BlogPost.findOne({ _id: req.params.id, isDeleted: false });
  if (!post) throw new AppError(404, 'NOT_FOUND', 'Blog post not found');
  const patch: Record<string, unknown> = { ...req.body };
  if (typeof req.body.content === 'string') {
    patch.content = sanitizeContent(req.body.content);
  }
  if (req.body.published && !post.publishedAt) {
    patch.publishedAt = new Date();
  }
  Object.assign(post, patch);
  await post.save();
  res.json({ success: true, data: post });
}

export async function deleteBlogPost(req: Request, res: Response): Promise<void> {
  const result = await BlogPost.updateOne({ _id: req.params.id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } });
  if (!result.matchedCount) throw new AppError(404, 'NOT_FOUND', 'Blog post not found');
  res.status(204).send();
}

export async function listCaseStudies(req: Request, res: Response): Promise<void> {
  const q = validated<{ page: number; limit: number; search?: string; industry?: string; published?: string }>(req, 'query');
  const filter = contentFilter(q as never, 'case');
  filter.published = q.published === 'false' ? false : true;
  const [data, total] = await Promise.all([CaseStudy.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(), CaseStudy.countDocuments(filter)]);
  res.json({ success: true, data, pagination: paginationMeta(q.page, q.limit, total) });
}

export async function getCaseStudy(req: Request, res: Response): Promise<void> {
  const item = await CaseStudy.findOne({ slug: stringParam(req.params.slug, 'slug'), isDeleted: false, published: true }).lean();
  if (!item) throw new AppError(404, 'NOT_FOUND', 'Case study not found');
  res.json({ success: true, data: item });
}

export async function createCaseStudy(req: Request, res: Response): Promise<void> {
  const item = await CaseStudy.create({ ...req.body, authorId: req.auth!.id, publishedAt: req.body.published ? new Date() : undefined, isDeleted: false });
  res.status(201).json({ success: true, data: item });
}

export async function updateCaseStudy(req: Request, res: Response): Promise<void> {
  const item = await CaseStudy.findOne({ _id: req.params.id, isDeleted: false });
  if (!item) throw new AppError(404, 'NOT_FOUND', 'Case study not found');
  Object.assign(item, { ...req.body, publishedAt: req.body.published && !item.publishedAt ? new Date() : item.publishedAt });
  await item.save();
  res.json({ success: true, data: item });
}

export async function deleteCaseStudy(req: Request, res: Response): Promise<void> {
  const result = await CaseStudy.updateOne({ _id: req.params.id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } });
  if (!result.matchedCount) throw new AppError(404, 'NOT_FOUND', 'Case study not found');
  res.status(204).send();
}

export async function listBlogCategories(_req: Request, res: Response): Promise<void> {
  const categories = await BlogPost.distinct('category', { published: true, isDeleted: false });
  res.json({ success: true, data: categories });
}
