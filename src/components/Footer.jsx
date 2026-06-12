import { FiInstagram, FiMail, FiMapPin, FiPhone, FiShoppingBag } from "react-icons/fi";

export default function Footer() {
  const phone = import.meta.env.VITE_STORE_PHONE || "+234 800 000 0000";
  const email = import.meta.env.VITE_STORE_EMAIL || "hello@namari.store";
  return (
    <footer id="contact" className="bg-ink text-slate-300">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan text-ink"><FiShoppingBag /></span>
            <span className="text-xl font-extrabold">NAMARI STORE</span>
          </div>
          <p className="max-w-xs text-sm leading-7">Premium gadgets, honest advice, and reliable support from selection to delivery.</p>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">Explore</h3>
          <div className="space-y-3 text-sm">
            <a className="block hover:text-cyan" href="/#shop">All gadgets</a>
            <a className="block hover:text-cyan" href="/#featured">Featured picks</a>
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">Contact</h3>
          <div className="space-y-4 text-sm">
            <p className="flex gap-3"><FiPhone className="mt-0.5 text-cyan" />{phone}</p>
            <p className="flex gap-3"><FiMail className="mt-0.5 text-cyan" />{email}</p>
            <p className="flex gap-3"><FiMapPin className="mt-0.5 text-cyan" />Lagos, Nigeria</p>
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">Stay connected</h3>
          <p className="mb-4 text-sm leading-6">Follow new arrivals, product tips, and special offers.</p>
          <a href="#" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white hover:bg-cyan hover:text-ink"><FiInstagram /></a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Namari Store. All rights reserved.</p>
          <p>Quality technology. Personal service.</p>
        </div>
      </div>
    </footer>
  );
}
