import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth/AuthProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RootLayout } from './layouts/RootLayout';
import { RequireAuth } from './components/RequireAuth';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const WebsiteDev = lazy(() => import('./pages/services/WebsiteDev'));
const AiAutomation = lazy(() => import('./pages/services/AiAutomation'));
const AiUgcAds = lazy(() => import('./pages/services/AiUgcAds'));
const Branding = lazy(() => import('./pages/services/Branding'));
const AiAgents = lazy(() => import('./pages/services/AiAgents'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const About = lazy(() => import('./pages/About'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const AiAssistant = lazy(() => import('./pages/AiAssistant'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Page loader spinner
const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '2px solid var(--color-border)',
      borderTopColor: 'var(--color-gold)',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'services', element: <Suspense fallback={<PageLoader />}><Services /></Suspense> },
      { path: 'services/website-development', element: <Suspense fallback={<PageLoader />}><WebsiteDev /></Suspense> },
      { path: 'services/ai-automation', element: <Suspense fallback={<PageLoader />}><AiAutomation /></Suspense> },
      { path: 'services/ai-ugc-ads', element: <Suspense fallback={<PageLoader />}><AiUgcAds /></Suspense> },
      { path: 'services/branding', element: <Suspense fallback={<PageLoader />}><Branding /></Suspense> },
      { path: 'services/ai-agents', element: <Suspense fallback={<PageLoader />}><AiAgents /></Suspense> },
      { path: 'portfolio', element: <Suspense fallback={<PageLoader />}><Portfolio /></Suspense> },
      { path: 'case-studies', element: <Suspense fallback={<PageLoader />}><CaseStudies /></Suspense> },
      { path: 'case-studies/:slug', element: <Suspense fallback={<PageLoader />}><CaseStudyDetail /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: 'pricing', element: <Suspense fallback={<PageLoader />}><Pricing /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<PageLoader />}><Blog /></Suspense> },
      { path: 'blog/:slug', element: <Suspense fallback={<PageLoader />}><BlogPost /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: 'book-consultation', element: <Suspense fallback={<PageLoader />}><BookConsultation /></Suspense> },
      { path: 'ai-assistant', element: <Suspense fallback={<PageLoader />}><AiAssistant /></Suspense> },
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Suspense fallback={<PageLoader />}><Dashboard /></Suspense>
          </RequireAuth>
        ),
      },
      { path: 'login', element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: 'login/admin', element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: 'admin/login', element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: 'admin', element: <Navigate to="/login/admin" replace /> },
      { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--color-surface)',
                  color: 'var(--color-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: { primary: 'var(--color-gold)', secondary: 'var(--color-primary)' },
                },
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
