import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts, toggleProduct } from "../api/productApi";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import { useNotification } from "../context/NotificationContext";
import { formatCurrency } from "../utils/formatCurrency";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState("");
  const { notify } = useNotification();

  const load = () => fetchAdminProducts()
    .then((data) => setProducts(data.products))
    .catch((err) => notify(err.response?.data?.message || "Unable to load products", "error"))
    .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const visible = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "active" ? product.isActive : !product.isActive);
    return matchesQuery && matchesFilter;
  }), [products, query, filter]);

  const toggle = async (product) => {
    setBusyId(product._id);
    try {
      const updated = await toggleProduct(product._id);
      setProducts((current) => current.map((item) => item._id === updated._id ? updated : item));
      notify(`${updated.name} is now ${updated.isActive ? "active" : "inactive"}`);
    } catch (err) {
      notify(err.response?.data?.message || "Status update failed", "error");
    } finally { setBusyId(""); }
  };

  const remove = async () => {
    setBusyId(selected._id);
    try {
      await deleteProduct(selected._id);
      setProducts((current) => current.filter((item) => item._id !== selected._id));
      notify("Product deleted");
      setSelected(null);
    } catch (err) {
      notify(err.response?.data?.message || "Delete failed", "error");
    } finally { setBusyId(""); }
  };

  if (loading) return <Loader label="Loading products" />;
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-extrabold text-ink">Product catalogue</h2><p className="mt-1 text-sm text-slate-500">Manage all active and inactive products.</p></div><Link to="/admin/products/create" className="btn-accent"><FiPlus /> Add product</Link></div>
      <div className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[1fr_auto]">
        <label className="relative"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input className="input pl-11" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." /></label>
        <select className="input sm:w-44" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All products</option><option value="active">Active only</option><option value="inactive">Inactive only</option></select>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {visible.length ? <>
          <div className="hidden grid-cols-[minmax(280px,1fr)_140px_140px_110px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 lg:grid"><span>Product</span><span>Category</span><span>Price</span><span>Status</span><span>Actions</span></div>
          <div className="divide-y divide-slate-100">{visible.map((product) => <div key={product._id} className="grid gap-4 p-4 lg:grid-cols-[minmax(280px,1fr)_140px_140px_110px_100px] lg:items-center lg:px-6">
            <div className="flex min-w-0 items-center gap-3"><img src={product.image} alt="" className="h-16 w-16 shrink-0 rounded-xl bg-mist object-cover" /><div className="min-w-0"><p className="truncate font-bold text-ink">{product.name}</p><p className="mt-1 truncate text-xs text-slate-400">{product.brand || "No brand"} · {product.stockStatus}</p></div></div>
            <p className="text-sm font-medium text-slate-600"><span className="mr-2 text-xs text-slate-400 lg:hidden">Category:</span>{product.category}</p>
            <p className="text-sm font-bold text-ink">{formatCurrency(product.price)}</p>
            <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" className="peer sr-only" checked={product.isActive} disabled={busyId === product._id} onChange={() => toggle(product)} /><span className="relative h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-cyan after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" /><span className="text-xs font-bold text-slate-500">{product.isActive ? "Active" : "Hidden"}</span></label>
            <div className="flex gap-2"><Link to={`/admin/products/edit/${product._id}`} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:border-cyan hover:text-cyan" aria-label="Edit"><FiEdit2 /></Link><button onClick={() => setSelected(product)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500" aria-label="Delete"><FiTrash2 /></button></div>
          </div>)}</div>
        </> : <div className="p-14 text-center"><FiSearch className="mx-auto text-4xl text-slate-300" /><h3 className="mt-4 font-bold text-ink">No matching products</h3><p className="mt-1 text-sm text-slate-500">Adjust your search or add a new product.</p></div>}
      </div>
      <ConfirmModal open={Boolean(selected)} title="Delete this product?" message={`${selected?.name || "This product"} will be permanently removed from your catalogue.`} busy={busyId === selected?._id} onClose={() => setSelected(null)} onConfirm={remove} />
    </div>
  );
}
