import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/incidents/StatusBadge";
import { formatDate } from "../../utils/formatDate";
import { getAllIncidents, groupIncidents } from "../../services/incidentService";

export default function GroupIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const toggle = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const handleGroup = async () => {
    try {
      const grupoId = await groupIncidents(selected);
      setSelected([]);
      await load();
      Swal.fire("Incidentes agrupados", `Grupo creado: ${grupoId}`, "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Agrupar incidentes</h1>
          <p className="mt-2 text-slate-600">Selecciona reportes repetidos para tratarlos como un mismo evento.</p>
        </div>
        <button onClick={handleGroup} disabled={selected.length < 2} className="rounded-lg bg-brand-700 px-5 py-3 font-bold text-white hover:bg-brand-900">
          Agrupar seleccionados ({selected.length})
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {incidents.map((incident) => (
            <label key={incident.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex gap-3">
                <input type="checkbox" checked={selected.includes(incident.id)} onChange={() => toggle(incident.id)} className="mt-1 h-5 w-5 accent-brand-700" />
                <div className="min-w-0 flex-1">
                  <img src={incident.imagenURL} alt={incident.tipo} className="mb-3 h-40 w-full rounded-lg object-cover" />
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-950">{incident.tipo}</span>
                    <StatusBadge status={incident.estado} />
                  </div>
                  <p className="line-clamp-2 text-sm text-slate-600">{incident.descripcion}</p>
                  <p className="mt-2 text-sm text-slate-500">{incident.ubicacionTexto}</p>
                  <p className="mt-1 text-xs text-slate-400">{formatDate(incident.fechaCreacion)}</p>
                  {incident.grupoId && <p className="mt-2 text-xs font-bold text-brand-700">Grupo actual: {incident.grupoId}</p>}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
