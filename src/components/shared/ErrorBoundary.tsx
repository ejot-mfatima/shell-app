import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  remoteName: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary] ${this.props.remoteName}:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[12rem] text-center p-8">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-3">
            <span className="text-red-400 text-xl">⚠</span>
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">
            Failed to load {this.props.remoteName}
          </h3>
          <p className="text-sm text-slate-400 mb-3">Make sure the remote app is running</p>
          <code className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded w-full max-w-lg whitespace-pre-wrap break-words text-left">
            {this.state.error?.message}
          </code>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 text-sm text-indigo-600 hover:underline"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
