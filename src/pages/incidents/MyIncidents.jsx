import { useEffect, useMemo, useState } from "react";
import IncidentFilter from "../../components/incidents/IncidentFilter";
import IncidentList from "../../components/incidents/IncidentList";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";
import { useIncidents } from "../../hooks/useIncidents";

const initialFilters = { search: "", status: "", type: "" };

export default function MyIncidents() {
  const { user } = useAuth();
  const { incidents, loading, loadIncidents } = useIncidents();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    loadIncidents({ userId: user.uid });
  }, [loadIncidents, user.uid]);

  const filtered = useMemo(() => {
    const search = filters.search.toLowerCase();
    return incidents.filter((incident) => {
      const matchSearch = `${incident.descripcion} ${incident.ubicacionTexto}`.toLowerCase().includes(search);
      const matchStatus = filters.status ? incident.estado === filters.status : true;
      const matchType = filters.type ? incident.tipo === filters.type : true;
      return matchSearch && matchStatus && matchType;
    });
  }, [filters, incidents]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Mis incidentes</h1>
        <p className="mt-2 text-slate-600">Consulta el estado de atencion de tus reportes.</p>
      </div>
      <IncidentFilter filters={filters} onChange={setFilters} />
      {loading ? <Loader /> : <IncidentList incidents={filtered} />}
    </div>
  );
}
