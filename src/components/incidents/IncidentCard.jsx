import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function IncidentCard({ incident }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <img src={incident.imagenURL} alt={incident.tipo} className="h-48 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700">
            {incident.tipo}
          </span>
          <StatusBadge status={incident.estado} />
        </div>

        <div>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">{incident.descripcion}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <FiMapPin className="shrink-0" />
            {incident.ubicacionTexto}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm">
          <span className="text-slate-500">{formatDate(incident.fechaCreacion)}</span>
          <Link className="font-semibold text-brand-700 hover:text-brand-900" to={`/incidentes/${incident.id}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
