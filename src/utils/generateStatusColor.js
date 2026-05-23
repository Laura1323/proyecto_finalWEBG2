export function getStatusClasses(status) {
  const classes = {
    Reportado: "bg-amber-100 text-amber-800 border-amber-200",
    "En proceso": "bg-sky-100 text-sky-800 border-sky-200",
    Resuelto: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  return classes[status] || "bg-slate-100 text-slate-700 border-slate-200";
}
