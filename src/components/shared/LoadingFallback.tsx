interface LoadingFallbackProps {
  name?: string;
}

export default function LoadingFallback({ name }: LoadingFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-3">
      <div className="w-7 h-7 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm">Loading {name ?? 'micro frontend'}…</p>
    </div>
  );
}
