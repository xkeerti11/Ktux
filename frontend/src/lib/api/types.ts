export interface ApiEnvelope<T> { success: boolean; data: T; }

export interface ChatMessage { role: 'user' | 'assistant'; content: string; createdAt?: string; }
export interface ChatResult { sessionId: string; message: string; providerRequestId?: string; }

export interface Pagination { page: number; limit: number; total: number; pages: number; }
export interface BlogPost { _id: string; title: string; slug: string; excerpt: string; content: string; featuredImage?: string; category: string; tags: string[]; readTime: number; published: boolean; publishedAt?: string; createdAt?: string; seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string }; }
export interface CaseStudy { _id: string; title: string; slug: string; industryTag: string; overview: string; challenge: string; solution: string; results: Array<{ label: string; value: string }>; images: string[]; techStack: string[]; clientName?: string; clientReview?: string; clientImage?: string; published: boolean; publishedAt?: string; createdAt?: string; }
export interface AnalyticsSummary { total: number; averageScore: number; statuses: Array<{ _id: string; count: number }>; services: Array<{ _id?: string; count: number }>; }
export interface Lead { _id: string; name: string; email: string; phone?: string; company?: string; industry?: string; serviceInterested: string[]; budgetRange?: string; timeline?: string; message?: string; status: string; leadScore?: number; source?: string; createdAt?: string; }
export interface Consultation { _id: string; calComId: string; clientName: string; clientEmail: string; clientPhone?: string; serviceType: string; bookingDateTime: string; meetingLink?: string; status: 'scheduled' | 'completed' | 'cancelled'; leadId?: Lead | { name?: string; email?: string; phone?: string }; notes?: string; createdAt?: string; updatedAt?: string; }
export interface UploadSignature { cloudName: string; apiKey: string; timestamp: number; folder: string; resourceType: 'image' | 'raw'; signature: string; }
