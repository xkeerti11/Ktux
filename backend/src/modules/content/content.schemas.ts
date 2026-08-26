import { z } from 'zod';
import { paginationSchema } from '../../utils/pagination';

export const slugParamsSchema = z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) });
export const idParamsSchema = z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) });
export const contentQuerySchema = paginationSchema.extend({ search: z.string().trim().max(120).optional(), category: z.string().trim().max(80).optional(), industry: z.string().trim().max(80).optional() });

export const blogPostSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(3).max(500),
  content: z.string().min(1).max(200000),
  featuredImage: z.string().url().optional(),
  category: z.string().trim().min(1).max(80),
  tags: z.array(z.string().trim().max(50)).max(30).default([]),
  seo: z.object({ metaTitle: z.string().max(200).optional(), metaDescription: z.string().max(500).optional(), keywords: z.array(z.string().max(80)).max(30).optional(), ogImage: z.string().url().optional(), ogDescription: z.string().max(500).optional() }).optional(),
  readTime: z.number().int().min(1).max(240).default(1),
  published: z.boolean().default(false)
});

export const caseStudySchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  industryTag: z.string().trim().min(1).max(80),
  overview: z.string().min(1).max(10000),
  challenge: z.string().min(1).max(10000),
  solution: z.string().min(1).max(10000),
  results: z.array(z.object({ label: z.string().max(100), value: z.string().max(100) })).max(20).default([]),
  images: z.array(z.string().url()).max(50).default([]),
  techStack: z.array(z.string().trim().max(80)).max(30).default([]),
  clientName: z.string().trim().max(160).optional(),
  clientReview: z.string().max(5000).optional(),
  clientImage: z.string().url().optional(),
  published: z.boolean().default(false)
});
