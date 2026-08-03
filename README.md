# shell-app — Host / Shell (MFA Demo)

> The **host (container) application** in this Micro Frontend Architecture demo. It owns authentication, routing, and the app shell — and dynamically loads two remote MFEs at runtime via Module Federation.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   shell-app  (:3000)                     │
│                                                          │
│  ┌────────────┐   ┌──────────────────────────────────┐  │
│  │  Sidebar   │   │           Main Content            │  │
│  │            │   │  ┌────────────────────────────┐  │  │
│  │ Dashboard  │   │  │  lazy<CmsDashboard>         │  │  │
│  │ CMS        │   │  │  [remote: cms-app :3001]    │  │  │
│  │ Analytics  │   │  └────────────────────────────┘  │  │
│  └────────────┘   │  ┌────────────────────────────┐  │  │
│                   │  │  lazy<AnalyticsDashboard>   │  │  │
│                   │  │  [remote: analytics :3002]  │  │  │
│                   │  └────────────────────────────┘  │  │
│                   └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
         ↑ remoteEntry.js fetched at runtime (no shared build)
```

## Related Repos

| Repo | Role | Port |
|------|------|------|
| **shell-app** ← you are here | Host / Container | :3000 |
| [cms-app](https://github.com/ejot-mfatima/cms-app) | Remote MFE | :3001 |
| [analytics-app](https://github.com/ejot-mfatima/analytics-app) | Remote MFE | :3002 |

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool & dev server |
| @originjs/vite-plugin-federation | Module Federation |
| React Router v6 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |

## Getting Started

```bash
# 1. Start remotes first (each in their own terminal)
cd ../cms-app       && npm install && npm run dev   # :3001
cd ../analytics-app && npm install && npm run dev   # :3002

# 2. Start the shell
npm install
npm run dev   # http://localhost:3000
```

Demo credentials:
- `admin` / `admin123`
- `editor` / `editor123`

## Project Structure

```
src/
├── main.tsx                    # Entry — async bootstrap (MFE pattern)
├── bootstrap.tsx               # Actual ReactDOM.render
├── App.tsx                     # BrowserRouter + AuthProvider
├── index.css                   # Tailwind directives
├── remotes.d.ts                # TS module declarations for remote MFEs
│
├── context/
│   └── AuthContext.tsx         # Auth state: login, logout, user, role
│
├── router/
│   ├── index.tsx               # Route tree
│   └── ProtectedRoute.tsx      # Auth guard — redirects to /login
│
├── pages/
│   ├── LoginPage.tsx           # Login form with demo credentials hint
│   ├── DashboardPage.tsx       # Side-by-side overview of both MFEs
│   ├── CmsPage.tsx             # Full ContentManager MFE
│   └── AnalyticsPage.tsx       # Full Analytics MFE (dashboard + metrics)
│
└── components/
    ├── layout/
    │   ├── AppShell.tsx        # Root layout: sidebar + topbar + <Outlet />
    │   ├── Sidebar.tsx         # Nav links with MFE badges
    │   └── TopBar.tsx          # User info + sign-out
    └── shared/
        ├── ErrorBoundary.tsx   # Catches remote load failures gracefully
        └── LoadingFallback.tsx # Suspense spinner while remote loads
```

## Key MFA Concepts Demonstrated

| Concept | Where |
|---------|-------|
| Module Federation — host config | `vite.config.ts` → `remotes` |
| Async bootstrap pattern | `src/main.tsx` → `void import('./bootstrap')` |
| Lazy + Suspense for remotes | `pages/DashboardPage`, `CmsPage`, `AnalyticsPage` |
| Error Boundary for MFE failures | `components/shared/ErrorBoundary.tsx` |
| Protected routes (auth guard) | `router/ProtectedRoute.tsx` |
| Context API for global state | `context/AuthContext.tsx` |
| TypeScript declarations for remotes | `src/remotes.d.ts` |

## Environment Variables

Copy `.env.example` to `.env.local` and update remote URLs for non-local environments:

```env
VITE_CMS_REMOTE_URL=http://localhost:3001/assets/remoteEntry.js
VITE_ANALYTICS_REMOTE_URL=http://localhost:3002/assets/remoteEntry.js
```

## GitHub Pages Deployment

This repo includes `.github/workflows/deploy-pages.yml` to auto-deploy on every push to `main`.

Expected production URLs:

- Shell app: `https://ejot-mfatima.github.io/shell-app/`
- CMS remote entry: `https://ejot-mfatima.github.io/cms-app/assets/remoteEntry.js`
- Analytics remote entry: `https://ejot-mfatima.github.io/analytics-app/assets/remoteEntry.js`
