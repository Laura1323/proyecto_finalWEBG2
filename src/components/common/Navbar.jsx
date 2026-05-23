import { FiLogOut, FiMenu } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ onMenu }) {
  const { profile, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <button onClick={onMenu} className="rounded-lg border border-slate-200 p-2 lg:hidden" aria-label="Abrir menu">
          <FiMenu />
        </button>
        <div>
          <p className="text-sm font-bold text-slate-900">{profile?.nombre || "Usuario"}</p>
          <p className="text-xs capitalize text-slate-500">{profile?.rol || "usuario"}</p>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          <FiLogOut />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
