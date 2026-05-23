import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function IncidentDetails({ incident }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <img src={incident.imagenURL} alt={incident.tipo} className="h-full max-h-[560px] w-full rounded-lg object-cover shadow-soft" />
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold uppercase text-brand-700">{incident.tipo}</span>
          <StatusBadge status={incident.estado} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Detalle del incidente</h1>
        <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">{incident.descripcion}</p>

        <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <FiMapPin className="text-brand-700" />
            {incident.ubicacionTexto}
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar className="text-brand-700" />
            {formatDate(incident.fechaCreacion)}
          </p>
          {incident.grupoId && (
            <p className="flex items-center gap-2">
              <FiUsers className="text-brand-700" />
              Grupo: {incident.grupoId}
            </p>
          )}
          {incident.latitud && incident.longitud && (
            <a
              className="inline-flex font-semibold text-brand-700 hover:text-brand-900"
              href={`https://maps.google.com/?q=${incident.latitud},${incident.longitud}`}
              target="_blank"
              rel="noreferrer"
            >
              Abrir coordenadas en Google Maps
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
