import { useEffect, useState } from "react";
import { FiArrowLeft, FiCheck, FiMessageCircle, FiShield, FiTruck } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { fetchProduct, fetchProducts } from "../api/productApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { formatCurrency } from "../utils/formatCurrency";
import { whatsappLink } from "../utils/whatsappLink";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProduct(id)
      .then(async (item) => {
        setProduct(item);
        const result = await fetchProducts({ category: item.category, limit: 4 });
        setRelated(result.products.filter((entry) => entry._id !== item._id).slice(0, 3));
      })
      .catch((err) => setError(err.response?.data?.message || "Product not found"))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div><Header /><main className="min-h-[70vh] bg-mist py-10 sm:py-16"><div className="container-page">
      {loading ? <Loader fullScreen label="Loading product" /> : error ? <div className="rounded-3xl bg-white p-12 text-center"><h1 className="text-2xl font-bold text-ink">{error}</h1><Link className="btn-primary mt-6" to="/#shop"><FiArrowLeft /> Back to shop</Link></div> : (
        <>
          <Link to="/#shop" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ink"><FiArrowLeft /> Back to collection</Link>
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card lg:grid-cols-2">
            <div className="bg-slate-100 p-4 sm:p-8"><img src={product.image} alt={product.name} className="aspect-square h-full w-full rounded-3xl object-cover" /></div>
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2"><span className="rounded-full bg-cyan/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan">{product.category}</span><span className={`rounded-full px-3 py-1.5 text-xs font-bold ${product.stockStatus === "Out of Stock" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>{product.stockStatus}</span></div>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">{product.name}</h1>
              {product.brand && <p className="mt-3 text-sm font-semibold text-slate-400">By {product.brand}</p>}
              <p className="mt-7 text-3xl font-extrabold text-ink">{formatCurrency(product.price)}</p>
              <p className="mt-7 leading-8 text-slate-600">{product.description}</p>
              {product.specifications?.length > 0 && <div className="mt-8 border-t border-slate-100 pt-7"><h2 className="font-bold text-ink">Specifications</h2><dl className="mt-4 divide-y divide-slate-100">{product.specifications.map((spec) => <div key={`${spec.key}-${spec.value}`} className="grid grid-cols-2 py-3 text-sm"><dt className="text-slate-400">{spec.key}</dt><dd className="font-semibold text-ink">{spec.value}</dd></div>)}</dl></div>}
              <a href={whatsappLink(product)} target="_blank" rel="noreferrer" className={`mt-8 w-full py-4 ${product.stockStatus === "Out of Stock" ? "btn-secondary pointer-events-none opacity-50" : "btn-accent"}`}><FiMessageCircle className="text-xl" /> Order on WhatsApp</a>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-500"><span className="flex items-center gap-2"><FiShield className="text-cyan" /> Quality checked</span><span className="flex items-center gap-2"><FiTruck className="text-cyan" /> Delivery available</span><span className="flex items-center gap-2"><FiCheck className="text-cyan" /> Direct support</span></div>
            </div>
          </div>
          {related.length > 0 && <section className="pt-20"><p className="eyebrow">More to explore</p><h2 className="mt-3 text-3xl font-extrabold text-ink">Related products</h2><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item._id} product={item} />)}</div></section>}
        </>
      )}
    </div></main><Footer /></div>
  );
}
