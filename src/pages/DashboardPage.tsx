import { Suspense, lazy } from 'react';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import LoadingFallback from '../components/shared/LoadingFallback';

const CmsDashboard = lazy(() => import('cmsApp/CmsDashboard'));
const AnalyticsDashboard = lazy(() => import('analyticsApp/AnalyticsDashboard'));

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Live overview of all micro frontends</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-700">CMS Overview</h2>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
              cms-app :3001
            </span>
          </div>
          <div className="p-5">
            <ErrorBoundary remoteName="CMS App">
              <Suspense fallback={<LoadingFallback name="CMS Dashboard" />}>
                <CmsDashboard />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-700">Analytics Overview</h2>
            <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full font-medium">
              analytics-app :3002
            </span>
          </div>
          <div className="p-5">
            <ErrorBoundary remoteName="Analytics App">
              <Suspense fallback={<LoadingFallback name="Analytics Dashboard" />}>
                <AnalyticsDashboard />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
