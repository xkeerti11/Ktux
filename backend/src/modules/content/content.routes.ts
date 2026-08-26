import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { apiLimiter, publicLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { blogPostSchema, caseStudySchema, contentQuerySchema, idParamsSchema, slugParamsSchema } from './content.schemas';
import { createBlogPost, createCaseStudy, deleteBlogPost, deleteCaseStudy, getBlogPost, getCaseStudy, listBlogCategories, listBlogPosts, listCaseStudies, updateBlogPost, updateCaseStudy } from './content.controller';

export const contentRouter = Router();
contentRouter.get('/blog/posts', publicLimiter, validate({ query: contentQuerySchema }), listBlogPosts);
contentRouter.get('/blog/posts/:slug', publicLimiter, validate({ params: slugParamsSchema }), getBlogPost);
contentRouter.get('/blog/categories', publicLimiter, listBlogCategories);
contentRouter.get('/case-studies', publicLimiter, validate({ query: contentQuerySchema }), listCaseStudies);
contentRouter.get('/case-studies/:slug', publicLimiter, validate({ params: slugParamsSchema }), getCaseStudy);

contentRouter.use(requireAuth, apiLimiter, requireAdmin);
contentRouter.post('/blog/posts', validate({ body: blogPostSchema }), createBlogPost);
contentRouter.patch('/blog/posts/:id', validate({ params: idParamsSchema, body: blogPostSchema.partial() }), updateBlogPost);
contentRouter.delete('/blog/posts/:id', validate({ params: idParamsSchema }), deleteBlogPost);
contentRouter.post('/case-studies', validate({ body: caseStudySchema }), createCaseStudy);
contentRouter.patch('/case-studies/:id', validate({ params: idParamsSchema, body: caseStudySchema.partial() }), updateCaseStudy);
contentRouter.delete('/case-studies/:id', validate({ params: idParamsSchema }), deleteCaseStudy);
