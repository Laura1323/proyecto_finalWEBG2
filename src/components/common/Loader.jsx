export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-soft">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
        <span className="text-sm font-medium text-slate-600">{text}</span>
      </div>
    </div>
  );
}
