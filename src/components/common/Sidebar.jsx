import { NavLink } from "react-router-dom";
import { FiBarChart2, FiClipboard, FiGrid, FiHome, FiPlusCircle, FiUsers } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const userLinks = [
  { to: "/dashboard", label: "Inicio", icon: FiHome },
  { to: "/incidentes/nuevo", label: "Reportar", icon: FiPlusCircle },
  { to: "/mis-incidentes", label: "Mis incidentes", icon: FiClipboard },
  { to: "/estadisticas", label: "Estadisticas", icon: FiBarChart2 },
];

const adminLinks = [
  { to: "/admin/incidentes", label: "Gestionar", icon: FiGrid },
  { to: "/admin/agrupar", label: "Agrupar", icon: FiUsers },
];

export default function Sidebar({ open, onClose }) {
  const { isAdmin } = useAuth();
  const links = isAdmin ? [...userLinks, ...adminLinks] : userLinks;

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/40 lg:hidden ${open ? "block" : "hidden"}`} onClick={onClose} />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-5 transition lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-700">UniAmazonia</p>
          <h2 className="text-xl font-black text-slate-950">Incidentes Campus</h2>
        </div>
        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive ? "bg-brand-700 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
