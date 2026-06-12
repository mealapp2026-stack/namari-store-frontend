import { useEffect, useState } from "react";
import { FiBox, FiCheckCircle, FiEye, FiEyeOff, FiPlus, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../api/productApi";
import Loader from "../components/Loader";
import { formatCurrency } from "../utils/formatCurrency";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminProducts().then(setData).catch((err) => setError(err.response?.data?.message || "Unable to load dashboard"));
  }, []);

  if (!data && !error) return <Loader label="Loading dashboard" />;
  if (error) return <div className="rounded-2xl bg-red-50 p-6 text-red-700">{error}</div>;

  const cards = [
    { label: "Total products", value: data.stats.total, icon: FiBox, color: "bg-blue-50 text-blue-600" },
    { label: "Active products", value: data.stats.active, icon: FiCheckCircle, color: "bg-emerald-50 text-emerald-600" },
    { label: "Inactive products", value: data.stats.inactive, icon: FiEyeOff, color: "bg-amber-50 text-amber-600" },
    { label: "Featured", value: data.stats.featured, icon: FiStar, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><h2 className="text-2xl font-extrabold text-ink">Store overview</h2><p className="mt-1 text-sm text-slate-500">A quick look at your current product catalogue.</p></div>
        <Link to="/admin/products/create" className="btn-accent"><FiPlus /> Add new product</Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${color}`}><Icon /></span><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live</span></div><p className="mt-5 text-3xl font-extrabold text-ink">{value}</p><p className="mt-1 text-sm font-medium text-slate-500">{label}</p></div>)}
      </div>
      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6"><div><h3 className="font-bold text-ink">Recently added</h3><p className="mt-1 text-xs text-slate-500">Your latest products</p></div><Link to="/admin/products" className="text-sm font-bold text-cyan">View all</Link></div>
        {data.products.length ? <div className="divide-y divide-slate-100">{data.products.slice(0, 5).map((product) => <div key={product._id} className="flex items-center gap-4 p-4 sm:px-6"><img src={product.image} alt="" className="h-14 w-14 rounded-xl bg-mist object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-bold text-ink">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.category} · {formatCurrency(product.price)}</p></div><span className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:inline ${product.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{product.isActive ? "Active" : "Inactive"}</span><Link to={`/admin/products/edit/${product._id}`} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:text-ink"><FiEye /></Link></div>)}</div> : <div className="p-12 text-center"><FiBox className="mx-auto text-4xl text-slate-300" /><p className="mt-3 font-bold text-ink">No products yet</p><Link className="mt-2 inline-block text-sm font-bold text-cyan" to="/admin/products/create">Add your first product</Link></div>}
      </section>
    </div>
  );
}
