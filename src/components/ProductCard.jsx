import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { whatsappLink } from "../utils/whatsappLink";

export default function ProductCard({ product }) {
  const available = product.stockStatus !== "Out of Stock";
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="p-4 pb-0">
        <Link to={`/product/${product._id}`} className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-4 top-4 flex gap-2">
            {product.isFeatured && <span className="rounded-full bg-ink px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white">Featured</span>}
            <span className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {product.stockStatus}
            </span>
          </div>
        </Link>
      </div>
      <div className="p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan">{product.category}</p>
        <Link to={`/product/${product._id}`}><h3 className="line-clamp-1 text-lg font-bold text-ink hover:text-cyan">{product.name}</h3></Link>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{product.description}</p>
        <p className="mt-5 text-xl font-extrabold text-ink">{formatCurrency(product.price)}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/product/${product._id}`} className="btn-secondary px-3 py-2.5">Details <FiArrowUpRight /></Link>
          <a href={whatsappLink(product)} target="_blank" rel="noreferrer" className={`px-3 py-2.5 ${available ? "btn-accent" : "btn-secondary pointer-events-none opacity-50"}`}>
            <FiMessageCircle /> Order
          </a>
        </div>
      </div>
    </article>
  );
}
