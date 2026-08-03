import { Suspense, lazy } from 'react';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import LoadingFallback from '../components/shared/LoadingFallback';

const AnalyticsDashboard = lazy(() => import('analyticsApp/AnalyticsDashboard'));
const MetricsWidget = lazy(() => import('analyticsApp/MetricsWidget'));

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Analytics dashboard — loaded from{' '}
            <code className="bg-slate-100 px-1 rounded text-xs">analytics-app</code> at runtime
          </p>
        </div>
        <span className="text-xs bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full font-medium border border-purple-100">
          🔗 Module Federation Remote
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200">
          <ErrorBoundary remoteName="Analytics App">
            <Suspense fallback={<LoadingFallback name="Analytics Dashboard" />}>
              <AnalyticsDashboard />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200">
          <ErrorBoundary remoteName="Analytics App">
            <Suspense fallback={<LoadingFallback name="Metrics Widget" />}>
              <MetricsWidget />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
