import { Schema, model, type HydratedDocument, Types } from 'mongoose';

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  authorId: Types.ObjectId;
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[]; ogImage?: string; ogDescription?: string };
  readTime: number;
  views: number;
  published: boolean;
  publishedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

const schema = new Schema<IBlogPost>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true },
  featuredImage: String,
  category: { type: String, required: true, trim: true, index: true },
  tags: { type: [String], default: [] },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seo: { type: Schema.Types.Mixed },
  readTime: { type: Number, min: 1, default: 1 },
  views: { type: Number, min: 0, default: 0 },
  published: { type: Boolean, default: false, index: true },
  publishedAt: Date,
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: Date
}, { timestamps: true });

schema.index({ published: 1, publishedAt: -1 });
export type BlogPostDocument = HydratedDocument<IBlogPost>;
export const BlogPost = model<IBlogPost>('BlogPost', schema);
