import { useState } from "react";
import { FiBox, FiGrid, FiLogOut, FiMenu, FiPlus, FiShoppingBag, FiX } from "react-icons/fi";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/admin/dashboard", label: "Overview", icon: FiGrid },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/products/create", label: "Add product", icon: FiPlus },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = nav.find((item) => location.pathname.startsWith(item.to))?.label || "Dashboard";

  const signOut = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-mist">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink p-5 text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan text-ink"><FiShoppingBag /></span>
            <div><p className="font-extrabold tracking-wider">NAMARI STORE</p><p className="text-[10px] uppercase tracking-[.22em] text-slate-400">Admin console</p></div>
          </NavLink>
          <button className="lg:hidden" onClick={() => setOpen(false)}><FiX /></button>
        </div>
        <nav className="mt-10 space-y-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-cyan text-ink" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="mb-4 rounded-2xl bg-white/5 p-4">
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"><FiLogOut /> Log out</button>
        </div>
      </aside>
      {open && <button className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="text-xl text-ink lg:hidden"><FiMenu /></button>
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin dashboard</p><h1 className="text-xl font-extrabold text-ink">{title}</h1></div>
          </div>
          <NavLink to="/" target="_blank" className="btn-secondary hidden py-2.5 sm:inline-flex">View store</NavLink>
        </header>
        <div className="p-4 sm:p-8"><Outlet /></div>
      </main>
    </div>
  );
}
