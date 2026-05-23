import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import IncidentFilter from "../../components/incidents/IncidentFilter";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/incidents/StatusBadge";
import { INCIDENT_STATUSES } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";
import { getAllIncidents, updateIncidentStatus } from "../../services/incidentService";

const initialFilters = { search: "", status: "", type: "" };

export default function ManageIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const load = async () => {
    setLoading(true);
    try {
      setIncidents(await getAllIncidents());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const filtered = useMemo(() => {
    const search = filters.search.toLowerCase();
    return incidents.filter((incident) => {
      const matchSearch = `${incident.descripcion} ${incident.ubicacionTexto}`.toLowerCase().includes(search);
      const matchStatus = filters.status ? incident.estado === filters.status : true;
      const matchType = filters.type ? incident.tipo === filters.type : true;
      return matchSearch && matchStatus && matchType;
    });
  }, [filters, incidents]);

  const handleStatus = async (incident, estado) => {
    try {
      await updateIncidentStatus(incident, estado);
      await load();
      Swal.fire("Estado actualizado", incident.grupoId ? "El cambio se aplico al grupo completo." : "El incidente fue actualizado.", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Gestionar incidentes</h1>
        <p className="mt-2 text-slate-600">Actualiza estados. Si el incidente pertenece a un grupo, el cambio se replica.</p>
      </div>
      <IncidentFilter filters={filters} onChange={setFilters} />
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Incidente</th>
                  <th className="px-4 py-3">Ubicacion</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Actualizar</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={incident.imagenURL} alt={incident.tipo} className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-950">{incident.tipo}</p>
                          <p className="line-clamp-1 max-w-xs text-slate-500">{incident.descripcion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{incident.ubicacionTexto}</td>
                    <td className="px-4 py-3">{formatDate(incident.fechaCreacion)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={incident.estado} />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={incident.estado}
                        onChange={(event) => handleStatus(incident, event.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-brand-600"
                      >
                        {INCIDENT_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
