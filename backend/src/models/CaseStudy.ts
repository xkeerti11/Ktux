import { Schema, model, type HydratedDocument, Types } from 'mongoose';

export interface ICaseStudy {
  title: string;
  slug: string;
  industryTag: string;
  overview: string;
  challenge: string;
  solution: string;
  results: Array<{ label: string; value: string }>;
  images: string[];
  techStack: string[];
  clientName?: string;
  clientReview?: string;
  clientImage?: string;
  authorId: Types.ObjectId;
  published: boolean;
  publishedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

const schema = new Schema<ICaseStudy>({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  industryTag: { type: String, required: true, index: true },
  overview: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: { type: [{ label: String, value: String }], default: [] },
  images: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  clientName: String,
  clientReview: String,
  clientImage: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false, index: true },
  publishedAt: Date,
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: Date
}, { timestamps: true });

schema.index({ published: 1, createdAt: -1 });
export type CaseStudyDocument = HydratedDocument<ICaseStudy>;
export const CaseStudy = model<ICaseStudy>('CaseStudy', schema);
