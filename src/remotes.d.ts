// TypeScript module declarations for Module Federation remotes.
// These match the `exposes` keys defined in each remote's vite.config.ts.

declare module 'cmsApp/CmsDashboard' {
  const CmsDashboard: React.ComponentType;
  export default CmsDashboard;
}

declare module 'cmsApp/ContentManager' {
  const ContentManager: React.ComponentType;
  export default ContentManager;
}

declare module 'analyticsApp/AnalyticsDashboard' {
  const AnalyticsDashboard: React.ComponentType;
  export default AnalyticsDashboard;
}

declare module 'analyticsApp/MetricsWidget' {
  const MetricsWidget: React.ComponentType;
  export default MetricsWidget;
}
