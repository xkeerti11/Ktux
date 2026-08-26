import { useState, type FormEvent, type ComponentType, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BarChart3, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, FileImage, FileText, LayoutDashboard, LayoutGrid, LogOut, Menu, Pencil, Plus, Search, Settings2, Trash2, UploadCloud, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { client } from '../lib/api/client';
import { getAnalytics, getConsultations, getLeads, listBlogPosts, listCaseStudies, presignUpload, uploadToCloudinary } from '../lib/api/endpoints';
import type { BlogPost, CaseStudy } from '../lib/api/types';
import { useAuth } from '../auth/AuthProvider';

type Tab = 'overview' | 'leads' | 'consultations' | 'content' | 'portfolio';
const statuses = ['new', 'contacted', 'interested', 'consultation_booked', 'proposal_sent', 'won', 'lost'] as const;
const blankBlog = { title: '', slug: '', excerpt: '', content: '', category: 'Web Development', featuredImage: '', tags: '', readTime: 5, published: false };
const blankCase = { title: '', slug: '', industryTag: 'Real Estate', overview: '', challenge: '', solution: '', results: '', images: '', techStack: '', clientName: '', clientReview: '', published: false };

function AdminContent() {
  const qc = useQueryClient();
  const [kind, setKind] = useState<'blog' | 'case'>('blog');
  const [editor, setEditor] = useState<'blog' | 'case' | null>(null);
  const [editingId, setEditingId] = useState<string>();
  const [blog, setBlog] = useState(blankBlog);
  const [caseStudy, setCaseStudy] = useState(blankCase);
  const [uploading, setUploading] = useState(false);
  const blogs = useQuery({ queryKey: ['admin-blog'], queryFn: () => listBlogPosts({ page: 1, limit: 50 }) });
  const cases = useQuery({ queryKey: ['admin-case'], queryFn: () => listCaseStudies({ page: 1, limit: 50 }) });
  const items = kind === 'blog' ? blogs.data?.data || [] : cases.data?.data || [];
  const reset = () => { setEditor(null); setEditingId(undefined); setBlog(blankBlog); setCaseStudy(blankCase); };
  const edit = (item: BlogPost | CaseStudy) => {
    setEditingId(item._id); setEditor(kind);
    if (kind === 'blog') { const post = item as BlogPost; setBlog({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, featuredImage: post.featuredImage || '', tags: post.tags?.join(', ') || '', readTime: post.readTime, published: post.published }); }
    else { const value = item as CaseStudy; setCaseStudy({ title: value.title, slug: value.slug, industryTag: value.industryTag, overview: value.overview, challenge: value.challenge, solution: value.solution, results: value.results?.map((entry) => `${entry.label}|${entry.value}`).join('\n') || '', images: value.images?.join('\n') || '', techStack: value.techStack?.join(', ') || '', clientName: value.clientName || '', clientReview: value.clientReview || '', published: value.published }); }
  };
  const upload = async (file: File, target: 'blog' | 'case') => { setUploading(true); try { const signature = await presignUpload({ folder: target === 'blog' ? 'blog' : 'case-studies', resourceType: 'image' }); const url = await uploadToCloudinary(file, signature); if (target === 'blog') setBlog((value) => ({ ...value, featuredImage: url })); else setCaseStudy((value) => ({ ...value, images: value.images ? `${value.images}\n${url}` : url })); toast.success('Image uploaded'); } catch { toast.error('Upload failed'); } finally { setUploading(false); } };
  const save = useMutation({ mutationFn: async () => { if (kind === 'blog') { const payload = { ...blog, tags: blog.tags.split(',').map((tag) => tag.trim()).filter(Boolean), readTime: Number(blog.readTime) }; return editingId ? client.patch(`/blog/posts/${editingId}`, payload) : client.post('/blog/posts', payload); } const payload = { ...caseStudy, results: caseStudy.results.split('\n').map((line) => { const [label, value] = line.split('|'); return { label: label?.trim() || '', value: value?.trim() || '' }; }).filter((entry) => entry.label && entry.value), images: caseStudy.images.split('\n').map((value) => value.trim()).filter(Boolean), techStack: caseStudy.techStack.split(',').map((value) => value.trim()).filter(Boolean) }; return editingId ? client.patch(`/case-studies/${editingId}`, payload) : client.post('/case-studies', payload); }, onSuccess: () => { toast.success('Content saved'); qc.invalidateQueries({ queryKey: ['admin-blog'] }); qc.invalidateQueries({ queryKey: ['admin-case'] }); reset(); }, onError: () => toast.error('Could not save content') });
  const remove = async (id: string) => { if (!window.confirm('Delete this content?')) return; try { await client.delete(kind === 'blog' ? `/blog/posts/${id}` : `/case-studies/${id}`); toast.success('Content deleted'); qc.invalidateQueries({ queryKey: [`admin-${kind}`] }); } catch { toast.error('Could not delete content'); } };
  return <section className="content-manager"><div className="content-toolbar"><div className="admin-tabs"><button className={kind === 'blog' ? 'active' : ''} onClick={() => { setKind('blog'); reset(); }}><BookOpen size={14} /> Blog posts</button><button className={kind === 'case' ? 'active' : ''} onClick={() => { setKind('case'); reset(); }}><FileText size={14} /> Case studies</button></div><button className="button button-primary" onClick={() => { setEditor(kind); setEditingId(undefined); }}><Plus size={15} /> New {kind === 'blog' ? 'post' : 'case study'}</button></div>{editor ? <ContentEditor kind={editor} blog={blog} setBlog={setBlog} caseStudy={caseStudy} setCaseStudy={setCaseStudy} uploading={uploading} upload={upload} save={save} reset={reset} /> : <div className="admin-content-list">{items.map((item) => <div className="admin-content-item surface-card" key={item._id}><div className="admin-content-icon">{kind === 'blog' ? <FileText size={18} /> : <FileImage size={18} />}</div><div><strong>{item.title}</strong><span>{kind === 'blog' ? (item as BlogPost).category : (item as CaseStudy).industryTag}</span></div><span className="admin-published">Published</span><button className="icon-button" onClick={() => edit(item)} aria-label="Edit content"><Pencil size={14} /></button><button className="icon-button danger" onClick={() => remove(item._id)} aria-label="Delete content"><Trash2 size={14} /></button></div>)}{!items.length && <div className="admin-empty">No published content yet. Create the first piece from this workspace.</div>}</div>}</section>;
}

function ContentEditor({ kind, blog, setBlog, caseStudy, setCaseStudy, uploading, upload, save, reset }: any) {
  return <form className="content-editor surface-card" onSubmit={(event: FormEvent) => { event.preventDefault(); save.mutate(); }}><div className="editor-head"><div><span className="eyebrow">New or published content</span><h2>{kind === 'blog' ? 'Shape the story.' : 'Frame the case.'}</h2></div><button type="button" className="icon-button" onClick={reset}><X size={17} /></button></div>{kind === 'blog' ? <div className="form-grid"><TextField label="Title" value={blog.title} onChange={(value: string) => setBlog({ ...blog, title: value })} /><TextField label="Slug" value={blog.slug} onChange={(value: string) => setBlog({ ...blog, slug: value })} /><TextField label="Category" value={blog.category} onChange={(value: string) => setBlog({ ...blog, category: value })} /><TextField label="Read time" type="number" value={blog.readTime} onChange={(value: string) => setBlog({ ...blog, readTime: Number(value) })} /><TextArea label="Excerpt" value={blog.excerpt} onChange={(value: string) => setBlog({ ...blog, excerpt: value })} full /><TextArea label="Content HTML" value={blog.content} onChange={(value: string) => setBlog({ ...blog, content: value })} full rows={10} /><TextField label="Tags (comma separated)" value={blog.tags} onChange={(value: string) => setBlog({ ...blog, tags: value })} /><UploadField value={blog.featuredImage} onChange={(value: string) => setBlog({ ...blog, featuredImage: value })} onUpload={(file: File) => upload(file, 'blog')} uploading={uploading} /></div> : <div className="form-grid"><TextField label="Title" value={caseStudy.title} onChange={(value: string) => setCaseStudy({ ...caseStudy, title: value })} /><TextField label="Slug" value={caseStudy.slug} onChange={(value: string) => setCaseStudy({ ...caseStudy, slug: value })} /><TextField label="Industry" value={caseStudy.industryTag} onChange={(value: string) => setCaseStudy({ ...caseStudy, industryTag: value })} /><TextField label="Client" value={caseStudy.clientName} onChange={(value: string) => setCaseStudy({ ...caseStudy, clientName: value })} /><TextArea label="Overview" value={caseStudy.overview} onChange={(value: string) => setCaseStudy({ ...caseStudy, overview: value })} full /><TextArea label="Challenge" value={caseStudy.challenge} onChange={(value: string) => setCaseStudy({ ...caseStudy, challenge: value })} /><TextArea label="Solution" value={caseStudy.solution} onChange={(value: string) => setCaseStudy({ ...caseStudy, solution: value })} /><TextArea label="Results (label|value per line)" value={caseStudy.results} onChange={(value: string) => setCaseStudy({ ...caseStudy, results: value })} /><TextField label="Tech stack (comma separated)" value={caseStudy.techStack} onChange={(value: string) => setCaseStudy({ ...caseStudy, techStack: value })} /><TextArea label="Gallery URLs (one per line)" value={caseStudy.images} onChange={(value: string) => setCaseStudy({ ...caseStudy, images: value })} full /><div className="form-label"><span>Upload gallery image</span><label className="upload-button"><UploadCloud size={15} /><input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], 'case')} />{uploading ? 'Uploading' : 'Choose file'}</label></div><TextArea label="Client review" value={caseStudy.clientReview} onChange={(value: string) => setCaseStudy({ ...caseStudy, clientReview: value })} full /></div>}<div className="editor-actions"><label className="publish-toggle"><input type="checkbox" checked={kind === 'blog' ? blog.published : caseStudy.published} onChange={(event) => kind === 'blog' ? setBlog({ ...blog, published: event.target.checked }) : setCaseStudy({ ...caseStudy, published: event.target.checked })} /> Publish now</label><button className="button button-primary" disabled={save.isPending || uploading}><Check size={15} /> {save.isPending ? 'Saving…' : 'Save content'}</button></div></form>;
}
function TextField({ label, value, onChange, type = 'text' }: any) { return <label className="form-label">{label}<input className="form-field" required={['Title', 'Slug', 'Category', 'Industry'].includes(label)} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function TextArea({ label, value, onChange, full = false, rows = 5 }: any) { return <label className={`form-label ${full ? 'full-span' : ''}`}>{label}<textarea className="form-field" rows={rows} required={['Excerpt', 'Content HTML', 'Overview', 'Challenge', 'Solution'].includes(label)} value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function UploadField({ value, onChange, onUpload, uploading }: any) { return <label className="form-label">Featured image<div className="upload-row"><input className="form-field" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Cloudinary URL" /><label className="upload-button"><UploadCloud size={15} /><input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />{uploading ? 'Uploading' : 'Upload'}</label></div></label>; }

export default function Dashboard() {
  const { user, logout } = useAuth(); const navigate = useNavigate(); const qc = useQueryClient(); const [tab, setTab] = useState<Tab>('overview'); const [mobileNav, setMobileNav] = useState(false); const [search, setSearch] = useState(''); const [status, setStatus] = useState(''); const [page, setPage] = useState(1); const [selected, setSelected] = useState<any>(); const [from, setFrom] = useState(''); const [to, setTo] = useState('');
  const analytics = useQuery({ queryKey: ['analytics', from, to], queryFn: () => getAnalytics({ from: from || undefined, to: to || undefined }) }); const leads = useQuery({ queryKey: ['admin-leads', page, search, status], queryFn: () => getLeads({ page, limit: 10, search: search || undefined, status: status || undefined }) }); const consultations = useQuery({ queryKey: ['admin-consultations'], queryFn: () => getConsultations({ page: 1, limit: 30 }) }); const updateStatus = useMutation({ mutationFn: ({ id, value }: { id: string; value: string }) => client.patch(`/leads/${id}/status`, { status: value }), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-leads'] }); toast.success('Status updated'); } });
  const summary = analytics.data; const total = summary?.total ?? 0; const statusRows = summary?.statuses || []; const serviceRows = summary?.services || []; const navItems: Array<[Tab, string, ComponentType<{ size?: number }>, ReactNode]> = [['overview', 'Overview', LayoutDashboard, <LayoutDashboard key="overview" size={16} />], ['leads', 'Leads', Users, <Users key="leads" size={16} />], ['consultations', 'Consultations', CalendarDays, <CalendarDays key="consultations" size={16} />], ['content', 'Content studio', BookOpen, <BookOpen key="content" size={16} />], ['portfolio', 'Portfolio', LayoutGrid, <LayoutGrid key="portfolio" size={16} />]]; const download = async () => { try { const response = await client.get('/analytics/report.pdf', { responseType: 'blob' }); const url = URL.createObjectURL(response.data); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'ktux-lead-report.pdf'; anchor.click(); URL.revokeObjectURL(url); } catch { toast.error('Could not download report'); } };
  return <><Helmet><title>Studio workspace — KTUX</title><meta name="robots" content="noindex, nofollow" /></Helmet><div className="admin-app"><aside className={`admin-sidebar ${mobileNav ? 'open' : ''}`}><div className="admin-brand"><span className="brand-mark">K</span><span><strong>KTUX</strong><small>STUDIO / ADMIN</small></span></div><nav>{navItems.map(([key, label, , icon]) => <button className={tab === key ? 'active' : ''} key={key} onClick={() => { setTab(key); setMobileNav(false); }}>{icon}{label}</button>)}</nav><div className="admin-sidebar-bottom"><span className="admin-user"><span>{user?.name?.slice(0, 1) || 'A'}</span><small>{user?.email}</small></span><button onClick={async () => { await logout(); navigate('/login'); }}><LogOut size={15} /> Sign out</button></div></aside>{mobileNav && <button className="admin-overlay" aria-label="Close menu" onClick={() => setMobileNav(false)} />}<main className="admin-main"><header className="admin-topbar"><button className="admin-mobile-toggle" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div><span className="eyebrow">Studio workspace</span><h1>{tab === 'overview' ? `Good morning, ${user?.name?.split(' ')[0] || 'team'}` : navItems.find(([key]) => key === tab)?.[1]}</h1></div><div className="admin-top-actions"><a className="button button-ghost" href="/">View site</a><button className="icon-button" aria-label="Settings"><Settings2 size={16} /></button></div></header><div className="admin-content">{tab === 'overview' && <Overview summary={summary} total={total} statusRows={statusRows} serviceRows={serviceRows} from={from} to={to} setFrom={setFrom} setTo={setTo} download={download} />}{tab === 'leads' && <LeadsView leads={leads} search={search} setSearch={setSearch} status={status} setStatus={setStatus} setPage={setPage} page={page} updateStatus={updateStatus} setSelected={setSelected} />}{tab === 'consultations' && <ConsultationsView data={consultations.data?.data || []} refresh={() => qc.invalidateQueries({ queryKey: ['admin-consultations'] })} />}{tab === 'content' && <AdminContent />}{tab === 'portfolio' && <PortfolioManager />}</div></main>{selected && <LeadModal lead={selected} onClose={() => setSelected(undefined)} />}</div></>;
}
function Overview({ summary, total, statusRows, serviceRows, from, to, setFrom, setTo, download }: any) { return <><div className="admin-toolbar"><span className="admin-muted">Live view of your studio signals.</span><div className="date-filters"><input className="form-field" type="date" value={from} onChange={(event) => setFrom(event.target.value)} /><span>to</span><input className="form-field" type="date" value={to} onChange={(event) => setTo(event.target.value)} /><button className="button button-ghost" onClick={download}>Export PDF</button></div></div><div className="admin-stats"><StatCard label="Total leads" value={String(total)} icon={Users} /><StatCard label="Average score" value={Number(summary?.averageScore || 0).toFixed(1)} icon={BarChart3} /><StatCard label="Status groups" value={String(statusRows.length)} icon={LayoutDashboard} /><StatCard label="Services requested" value={String(serviceRows.length)} icon={BookOpen} /></div><div className="admin-chart-grid"><div className="admin-chart surface-card"><h3>Lead status distribution</h3><div className="status-bars">{statusRows.map((item: any) => <div className="status-bar-row" key={item._id}><span>{item._id || 'Unspecified'}</span><div><i style={{ width: `${total ? Math.max(4, item.count / total * 100) : 0}%` }} /></div><strong>{item.count}</strong></div>)}</div></div><div className="admin-chart surface-card"><h3>Services requested</h3><div className="service-bars">{serviceRows.map((item: any) => <div key={item._id}><span>{item.count}</span><small>{item._id || 'Other'}</small></div>)}</div></div></div></>; }
function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ size?: number }> }) { return <div className="admin-stat surface-card"><span className="admin-stat-icon"><Icon size={17} /></span><small>{label}</small><strong>{value}</strong></div>; }
function LeadsView({ leads, search, setSearch, status, setStatus, setPage, page, updateStatus, setSelected }: any) { return <section><div className="admin-toolbar"><div><span className="eyebrow">Pipeline</span><h2>Lead inbox</h2></div><div className="admin-filters"><label className="admin-search"><Search size={15} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search leads" /></label><select className="form-field" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All statuses</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div></div><div className="lead-table surface-card"><div className="lead-table-head"><span>Name</span><span>Company</span><span>Service</span><span>Status</span><span>Score</span><span /></div>{leads.isLoading ? <div className="admin-loading"><span className="spinner" /></div> : leads.data?.data?.map((lead: any) => <div className="lead-row" key={lead._id}><span><strong>{lead.name}</strong><small>{lead.email}</small></span><span>{lead.company || '—'}</span><span>{lead.serviceInterested?.[0] || '—'}</span><span><select value={lead.status} onChange={(event) => updateStatus.mutate({ id: lead._id, value: event.target.value })}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></span><span className="lead-score">{lead.leadScore ?? '—'}</span><button className="icon-button" onClick={() => setSelected(lead)} aria-label="View lead"><Search size={14} /></button></div>)}{!leads.isLoading && !leads.data?.data?.length && <div className="admin-empty">No leads match this view.</div>}<div className="pagination"><span>Page {page} · {leads.data?.pagination?.total || 0} total</span><div><button className="icon-button" disabled={page === 1} onClick={() => setPage((value: number) => value - 1)}><ChevronLeft size={15} /></button><button className="icon-button" disabled={page >= (leads.data?.pagination?.pages || 1)} onClick={() => setPage((value: number) => value + 1)}><ChevronRight size={15} /></button></div></div></div></section>; }
function ConsultationsView({ data, refresh }: { data: any[]; refresh: () => void }) { return <section><div className="admin-toolbar"><div><span className="eyebrow">Cal.com</span><h2>Consultations</h2></div></div><div className="consultation-list">{data.map((item) => <div className="consultation-row surface-card" key={item._id}><CalendarDays size={18} /><div><strong>{item.clientName}</strong><span>{item.clientEmail} · {item.serviceType}</span>{item.meetingLink && <a href={item.meetingLink} target="_blank" rel="noreferrer">Open meeting link</a>}</div><time>{new Date(item.bookingDateTime).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</time><span className={`status-chip ${item.status}`}>{item.status}</span><button className="icon-button danger" onClick={async () => { if (!window.confirm('Cancel this consultation?')) return; try { await client.delete(`/consultations/${item._id}`); refresh(); toast.success('Consultation cancelled'); } catch { toast.error('Could not cancel consultation'); } }} aria-label="Cancel consultation"><X size={15} /></button></div>)}</div>{!data.length && <div className="admin-empty">No consultations found.</div>}</section>; }
function LeadModal({ lead, onClose }: { lead: any; onClose: () => void }) { return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="lead-modal surface-card"><button className="icon-button modal-close" onClick={onClose} aria-label="Close lead"><X size={16} /></button><span className="eyebrow">Lead details</span><h2>{lead.name}</h2>{[['Email', lead.email], ['Phone', lead.phone], ['Company', lead.company], ['Services', lead.serviceInterested?.join(', ')], ['Budget', lead.budgetRange], ['Message', lead.message]].filter(([, value]) => value).map(([label, value]) => <div className="detail-line" key={label}><small>{label}</small><p>{value}</p></div>)}</div></div>; }

const blankPortfolio = { title: '', slug: '', industryTag: 'Real Estate', overview: '', challenge: '', solution: '', results: '', images: '', techStack: '', clientName: '', clientReview: '', published: false };

function PortfolioManager() {
  const qc = useQueryClient();
  const [editor, setEditor] = useState<null | 'add' | 'edit'>(null);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [form, setForm] = useState(blankPortfolio);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['portfolio-admin', search], queryFn: () => listCaseStudies({ search: search || undefined, page: 1, limit: 50 }) });
  const items: CaseStudy[] = data?.data || [];

  const reset = () => { setEditor(null); setEditingId(undefined); setForm(blankPortfolio); };

  const openEdit = (item: CaseStudy) => {
    setEditingId(item._id);
    setForm({
      title: item.title, slug: item.slug, industryTag: item.industryTag,
      overview: item.overview, challenge: item.challenge, solution: item.solution,
      results: item.results?.map((r) => `${r.label}|${r.value}`).join('\n') || '',
      images: item.images?.join('\n') || '',
      techStack: item.techStack?.join(', ') || '',
      clientName: item.clientName || '', clientReview: item.clientReview || '',
      published: item.published,
    });
    setEditor('edit');
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const sig = await presignUpload({ folder: 'case-studies', resourceType: 'image' });
      const url = await uploadToCloudinary(file, sig);
      setForm((f) => ({ ...f, images: f.images ? `${f.images}\n${url}` : url }));
      toast.success('Image uploaded');
    } catch { toast.error('Upload failed'); } finally { setUploading(false); }
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        results: form.results.split('\n').map((line) => { const [label, value] = line.split('|'); return { label: label?.trim() || '', value: value?.trim() || '' }; }).filter((r) => r.label && r.value),
        images: form.images.split('\n').map((u) => u.trim()).filter(Boolean),
        techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      };
      return editingId ? client.patch(`/case-studies/${editingId}`, payload) : client.post('/case-studies', payload);
    },
    onSuccess: () => { toast.success('Portfolio item saved'); qc.invalidateQueries({ queryKey: ['portfolio-admin'] }); qc.invalidateQueries({ queryKey: ['portfolio'] }); reset(); },
    onError: () => toast.error('Could not save portfolio item'),
  });

  const remove = async (id: string) => {
    if (!window.confirm('Delete this portfolio item?')) return;
    try { await client.delete(`/case-studies/${id}`); toast.success('Portfolio item deleted'); qc.invalidateQueries({ queryKey: ['portfolio-admin'] }); qc.invalidateQueries({ queryKey: ['portfolio'] }); }
    catch { toast.error('Could not delete portfolio item'); }
  };

  if (editor) return (
    <form className="content-editor surface-card" onSubmit={(e: FormEvent) => { e.preventDefault(); save.mutate(); }}>
      <div className="editor-head">
        <div><span className="eyebrow">{editor === 'edit' ? 'Edit portfolio item' : 'New portfolio item'}</span><h2>{editor === 'edit' ? 'Update the project.' : 'Add a project.'}</h2></div>
        <button type="button" className="icon-button" onClick={reset}><X size={17} /></button>
      </div>
      <div className="form-grid">
        <label className="form-label">Title<input className="form-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="form-label">Slug<input className="form-field" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
        <label className="form-label">Industry<input className="form-field" required value={form.industryTag} onChange={(e) => setForm({ ...form, industryTag: e.target.value })} /></label>
        <label className="form-label">Client name<input className="form-field" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} /></label>
        <label className="form-label full-span">Overview<textarea className="form-field" rows={3} required value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} /></label>
        <label className="form-label">Challenge<textarea className="form-field" rows={4} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} /></label>
        <label className="form-label">Solution<textarea className="form-field" rows={4} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} /></label>
        <label className="form-label">Results (label|value per line)<textarea className="form-field" rows={4} value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} /></label>
        <label className="form-label">Tech stack (comma separated)<input className="form-field" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} /></label>
        <label className="form-label full-span">Gallery image URLs (one per line)<textarea className="form-field" rows={4} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} /></label>
        <div className="form-label"><span>Upload gallery image</span><label className="upload-button"><UploadCloud size={15} /><input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />{uploading ? 'Uploading…' : 'Choose file'}</label></div>
        <label className="form-label full-span">Client review<textarea className="form-field" rows={3} value={form.clientReview} onChange={(e) => setForm({ ...form, clientReview: e.target.value })} /></label>
      </div>
      <div className="editor-actions">
        <label className="publish-toggle"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publish now</label>
        <button className="button button-primary" disabled={save.isPending || uploading}><Check size={15} /> {save.isPending ? 'Saving…' : 'Save project'}</button>
      </div>
    </form>
  );

  return (
    <section className="content-manager">
      <div className="content-toolbar">
        <div>
          <span className="eyebrow">Portfolio</span>
          <h2 style={{ marginTop: 7, fontSize: 26 }}>Portfolio projects</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <label className="admin-search"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" /></label>
          <button className="button button-primary" onClick={() => { setForm(blankPortfolio); setEditingId(undefined); setEditor('add'); }}><Plus size={15} /> New project</button>
        </div>
      </div>
      {isLoading ? <div className="admin-loading"><span className="spinner" /></div> : (
        <div className="admin-content-list">
          {items.map((item) => (
            <div className="admin-content-item surface-card" key={item._id}>
              <div className="admin-content-icon"><FileImage size={18} /></div>
              <div>
                <strong>{item.title}</strong>
                <span>{item.industryTag}{item.clientName ? ` · ${item.clientName}` : ''}</span>
              </div>
              <span className="admin-published" style={{ color: item.published ? 'var(--color-success)' : 'var(--page-muted)' }}>
                {item.published ? 'Published' : 'Draft'}
              </span>
              <button className="icon-button" onClick={() => openEdit(item)} aria-label="Edit project"><Pencil size={14} /></button>
              <button className="icon-button danger" onClick={() => remove(item._id)} aria-label="Delete project"><Trash2 size={14} /></button>
            </div>
          ))}
          {!items.length && <div className="admin-empty">No portfolio projects yet. Add your first project.</div>}
        </div>
      )}
    </section>
  );
}

