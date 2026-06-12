import { useState } from "react";
import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/#shop" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white">
            <FiShoppingBag />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-ink">NAMARI STORE</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/admin/login" className="btn-secondary py-2.5">Admin</NavLink>
          <a href="/#shop" className="btn-primary py-2.5">Shop gadgets</a>
        </div>
        <button className="text-2xl text-ink md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-5 md:hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-ink">
              {link.label}
            </a>
          ))}
          <Link to="/admin/login" className="btn-secondary mt-3 w-full">Admin login</Link>
        </nav>
      )}
    </header>
  );
}
