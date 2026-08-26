import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AIChatbotWidget } from '../components/AIChatbotWidget';
import { AdminLayout } from './AdminLayout';

function themeForPath(_pathname: string) {
  return 'dark';
}

export function RootLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/dashboard');
  const isLogin = location.pathname.startsWith('/login');
  const theme = useMemo(() => themeForPath(location.pathname), [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = isAdmin || isLogin ? 'dark' : theme;
    return () => { delete document.documentElement.dataset.theme; };
  }, [isAdmin, isLogin, theme]);

  if (isAdmin) return <AdminLayout><Outlet /></AdminLayout>;
  if (isLogin) return <div className="site-shell auth-shell"><Outlet /></div>;
  return (
    <div className="site-shell">
      <ScrollRestoration />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <AIChatbotWidget />
    </div>
  );
}
