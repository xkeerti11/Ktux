import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-primary)',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              padding: '48px 32px',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <AlertTriangle size={32} color="var(--color-error)" />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                color: 'var(--color-secondary)',
                marginBottom: '12px',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--color-neutral)',
                marginBottom: '32px',
                lineHeight: 1.7,
              }}
            >
              An unexpected error occurred. Please refresh the page. If the problem persists, contact support.
            </p>
            {this.state.error && (
              <pre
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#FC8181',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'left',
                  overflowX: 'auto',
                  marginBottom: '24px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button
              className="btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              <RefreshCw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
