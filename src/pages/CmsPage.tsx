import { Suspense, lazy } from 'react';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import LoadingFallback from '../components/shared/LoadingFallback';

const ContentManager = lazy(() => import('cmsApp/ContentManager'));

export default function CmsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">CMS</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Content management — loaded from{' '}
            <code className="bg-slate-100 px-1 rounded text-xs">cms-app</code> at runtime
          </p>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full font-medium border border-indigo-100">
          🔗 Module Federation Remote
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        <ErrorBoundary remoteName="CMS App">
          <Suspense fallback={<LoadingFallback name="Content Manager" />}>
            <ContentManager />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
