import { formatDate } from "../../utils/formatDate";

export default function PrintableReport({ incidents }) {
  return (
    <section className="print-area rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="mb-4 text-lg font-bold text-slate-950">Reporte imprimible</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Ubicacion</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Grupo</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-b border-slate-100">
                <td className="px-3 py-2">{formatDate(incident.fechaCreacion)}</td>
                <td className="px-3 py-2">{incident.tipo}</td>
                <td className="px-3 py-2">{incident.ubicacionTexto}</td>
                <td className="px-3 py-2">{incident.estado}</td>
                <td className="px-3 py-2">{incident.grupoId || "Sin grupo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
