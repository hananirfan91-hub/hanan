import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  declare readonly props: { children: React.ReactNode };
  state: ErrorBoundaryState;

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected rendering issue occurred.',
    };
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    try {
      window.history.pushState({ page: 'home' }, '', '/');
    } catch {
      // Ignore pushState errors in sandboxed frames
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080D1B] text-[#F8FAFC] flex items-center justify-center p-6">
          <div className="max-w-md w-full surface-card rounded-3xl p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-extrabold font-display text-[#F8FAFC]">
                Something went wrong
              </h1>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                This screen encountered an unexpected problem. Reloading usually restores normal navigation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 px-5 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="flex-1 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-[#F8FAFC] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
