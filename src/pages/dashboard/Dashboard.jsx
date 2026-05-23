import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { profile, isAdmin } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Panel principal</p>
        <h1 className="mt-3 text-3xl font-black md:text-5xl">Hola, {profile?.nombre || "usuario"}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Registra novedades del campus, consulta el avance de tus reportes y revisa estadisticas para apoyar la toma de decisiones.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Link to="/incidentes/nuevo" className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft hover:border-brand-600">
          <h2 className="text-xl font-black text-slate-950">Reportar incidente</h2>
          <p className="mt-2 text-slate-600">Adjunta una fotografia, ubicacion y descripcion para crear el reporte.</p>
          <span className="mt-4 inline-flex items-center gap-2 font-bold text-brand-700">
            Crear reporte <FiArrowRight />
          </span>
        </Link>
        <Link to={isAdmin ? "/admin/incidentes" : "/mis-incidentes"} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft hover:border-brand-600">
          <h2 className="text-xl font-black text-slate-950">{isAdmin ? "Gestionar incidentes" : "Mis incidentes"}</h2>
          <p className="mt-2 text-slate-600">Consulta estados, imagenes y detalles de los reportes registrados.</p>
          <span className="mt-4 inline-flex items-center gap-2 font-bold text-brand-700">
            Ver listado <FiArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
