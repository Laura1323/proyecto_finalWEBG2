import { useEffect, useMemo, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import Loader from "../../components/common/Loader";
import PrintableReport from "../../components/dashboard/PrintableReport";
import StatsCards from "../../components/dashboard/StatsCards";
import StatusChart from "../../components/dashboard/StatusChart";
import TypeChart from "../../components/dashboard/TypeChart";
import { useAuth } from "../../hooks/useAuth";
import { getAllIncidents, getUserIncidents } from "../../services/incidentService";
import { buildStatistics } from "../../services/statisticsService";
import { printReport } from "../../utils/printReport";

export default function Statistics() {
  const { user, isAdmin } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setIncidents(isAdmin ? await getAllIncidents() : await getUserIncidents(user.uid));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [isAdmin, user.uid]);

  const filtered = useMemo(() => {
    if (period === "all") return incidents;
    const now = new Date();
    const days = Number(period);
    return incidents.filter((incident) => {
      const date = incident.fechaCreacion?.toDate ? incident.fechaCreacion.toDate() : new Date(incident.fechaCreacion);
      return (now - date) / 86400000 <= days;
    });
  }, [incidents, period]);

  const stats = useMemo(() => buildStatistics(filtered), [filtered]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Estadisticas y reportes</h1>
          <p className="mt-2 text-slate-600">Indicadores por periodo, estado y tipo de incidente.</p>
        </div>
        <div className="flex gap-3">
          <select value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-lg border border-slate-200 px-4 py-3">
            <option value="all">Todo el periodo</option>
            <option value="7">Ultimos 7 dias</option>
            <option value="30">Ultimos 30 dias</option>
            <option value="90">Ultimos 90 dias</option>
          </select>
          <button onClick={printReport} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-700">
            <FiPrinter />
            Imprimir
          </button>
        </div>
      </div>
      <StatsCards stats={stats} />
      <div className="grid gap-5 xl:grid-cols-2">
        <StatusChart data={stats.byStatus} />
        <TypeChart data={stats.byType} />
      </div>
      <PrintableReport incidents={filtered} />
    </div>
  );
}
