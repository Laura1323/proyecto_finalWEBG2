import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-700">404</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950">Pagina no encontrada</h1>
        <p className="mt-3 text-slate-600">La ruta solicitada no existe o fue movida.</p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-lg bg-brand-700 px-5 py-3 font-bold text-white">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
