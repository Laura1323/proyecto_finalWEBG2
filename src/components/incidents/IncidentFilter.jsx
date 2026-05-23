import { INCIDENT_STATUSES, INCIDENT_TYPES } from "../../utils/constants";

export default function IncidentFilter({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-3">
      <input
        className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
        placeholder="Buscar por descripcion o ubicacion"
        value={filters.search}
        onChange={(event) => update("search", event.target.value)}
      />
      <select
        className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
        value={filters.status}
        onChange={(event) => update("status", event.target.value)}
      >
        <option value="">Todos los estados</option>
        {INCIDENT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <select
        className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-600"
        value={filters.type}
        onChange={(event) => update("type", event.target.value)}
      >
        <option value="">Todos los tipos</option>
        {INCIDENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
