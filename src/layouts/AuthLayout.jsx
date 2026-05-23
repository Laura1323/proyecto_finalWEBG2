import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loader text="Validando sesion..." />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-100 px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_440px]">
        <section className="space-y-6">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-soft">
            Universidad de la Amazonia
          </span>
          <div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Reporte y seguimiento de incidentes universitarios
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Plataforma web para registrar evidencias, consultar estados y apoyar la atencion oportuna de novedades dentro del campus.
            </p>
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
