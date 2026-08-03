import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router';

export default function App() {
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}
