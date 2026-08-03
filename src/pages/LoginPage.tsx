import { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(username, password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials. Use admin/admin123 or editor/editor123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white">MFA Demo</h1>
          <p className="text-slate-400 mt-1">Micro Frontend Architecture</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Sign in to continue</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 mb-2">Demo credentials</p>
            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <code className="bg-white px-1.5 py-0.5 rounded border text-xs">admin</code>
                <span className="text-slate-400">/</span>
                <code className="bg-white px-1.5 py-0.5 rounded border text-xs">admin123</code>
                <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-white px-1.5 py-0.5 rounded border text-xs">editor</code>
                <span className="text-slate-400">/</span>
                <code className="bg-white px-1.5 py-0.5 rounded border text-xs">editor123</code>
                <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Editor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
