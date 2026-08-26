import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }} />
          <p style={{ color: 'var(--color-neutral)', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
