import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '⊞', badge: null },
  { path: '/cms', label: 'CMS', icon: '✏️', badge: 'MFE' },
  { path: '/analytics', label: 'Analytics', icon: '📊', badge: 'MFE' },
] as const;

export default function Sidebar() {
  return (
    <aside className="w-60 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
            M
          </div>
          <div>
            <p className="font-semibold text-sm">MFA Demo</p>
            <p className="text-slate-400 text-xs">Shell Application</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="flex items-center gap-2.5">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </span>
            {item.badge && (
              <span className="text-xs bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-1.5">
        <p className="text-xs font-medium text-slate-500 mb-2">Remote Status</p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shrink-0" />
          <span>cms-app :3001</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shrink-0" />
          <span>analytics-app :3002</span>
        </div>
      </div>
    </aside>
  );
}
