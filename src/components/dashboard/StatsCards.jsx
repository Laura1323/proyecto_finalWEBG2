import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";

export default function StatsCards({ stats }) {
  const cards = [
    { label: "Total incidentes", value: stats.total, icon: FiAlertCircle, tone: "bg-slate-900 text-white" },
    { label: "Pendientes", value: stats.pending, icon: FiClock, tone: "bg-amber-100 text-amber-900" },
    { label: "Resueltos", value: stats.resolved, icon: FiCheckCircle, tone: "bg-emerald-100 text-emerald-900" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <article key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className={`mb-4 inline-flex rounded-lg p-3 ${tone}`}>
            <Icon />
          </div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <strong className="text-3xl font-black text-slate-950">{value}</strong>
        </article>
      ))}
    </div>
  );
}
