import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      <div className="text-sm text-slate-500">
        <span className="font-medium text-slate-700">Shell App</span>
        <span className="mx-2 text-slate-300">|</span>
        <span>Micro Frontend Architecture Demo</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-slate-500">Signed in as </span>
          <span className="font-semibold text-slate-700">{user?.username}</span>
          <span className="ml-1.5 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded capitalize">
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
