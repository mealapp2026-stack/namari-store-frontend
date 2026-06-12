import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiHeadphones, FiSearch, FiShield, FiTruck } from "react-icons/fi";
import { fetchProducts } from "../api/productApi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { whatsappConversationLink } from "../utils/whatsappLink";

export default function Home() {
  const [data, setData] = useState({ products: [], categories: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetchProducts({ search, category, sort, page, limit: 8 })
        .then(setData)
        .catch((err) => setError(err.response?.data?.message || "Unable to load products"))
        .finally(() => setLoading(false));
    }, search ? 350 : 0);
    return () => clearTimeout(timer);
  }, [search, category, sort, page]);

  const featured = useMemo(() => data.products.filter((item) => item.isFeatured).slice(0, 3), [data.products]);
  const categories = ["All", ...data.categories];

  return (
    <div>
      <Header />
      <main>
        <section id="home" className="relative overflow-hidden bg-ink">
          <div className="absolute inset-0 bg-grid bg-[size:42px_42px] opacity-40" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan/20 blur-3xl" />
          <div className="container-page relative grid min-h-[680px] items-center gap-12 py-20 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan">
                <span className="h-2 w-2 rounded-full bg-cyan" /> New technology, thoughtfully selected
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Better gadgets.<br /><span className="text-cyan">Smarter living.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Explore dependable phones, laptops, audio gear, and accessories selected for performance and everyday value.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#shop" className="btn-accent px-7 py-4">Explore the collection <FiArrowRight /></a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 text-sm font-bold text-white hover:bg-white/10">Talk to an expert</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
                {["Verified products", "Fast response", "Secure ordering"].map((item) => <span key={item} className="flex items-center gap-2"><FiCheck className="text-cyan" />{item}</span>)}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-10 rounded-full bg-cyan/20 blur-3xl" />
              <div className="relative ml-auto max-w-lg rotate-2 rounded-[2.5rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-300">
                  <img src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=85" alt="Premium smartphone" className="aspect-[4/5] w-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-10 rounded-2xl bg-white p-4 shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Curated collection</p><p className="mt-1 font-extrabold text-ink">Premium tech, ready to order</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white">
          <div className="container-page grid divide-y divide-slate-100 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[[FiShield, "Quality checked", "Products selected with care"], [FiTruck, "Reliable delivery", "Clear updates from order to arrival"], [FiHeadphones, "Personal support", "Real help before and after purchase"]].map(([Icon, title, text]) => (
              <div key={title} className="flex items-center gap-4 px-5 py-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan/10 text-xl text-cyan"><Icon /></span><div><p className="font-bold text-ink">{title}</p><p className="mt-1 text-xs text-slate-500">{text}</p></div></div>
            ))}
          </div>
        </section>

        {featured.length > 0 && <section id="featured" className="py-24"><div className="container-page"><p className="eyebrow">Handpicked</p><h2 className="mt-3 text-3xl font-extrabold text-ink">Featured gadgets</h2><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((product) => <ProductCard key={product._id} product={product} />)}</div></div></section>}

        <section id="shop" className="bg-white py-24">
          <div className="container-page">
            <div className="text-center"><p className="eyebrow">The collection</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Find your next essential</h2><p className="mx-auto mt-4 max-w-2xl text-slate-500">Search our active inventory and order directly through WhatsApp.</p></div>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                <label className="relative"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="input pl-11" placeholder="Search phones, laptops, brands..." /></label>
                <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="input min-w-44">{categories.map((item) => <option key={item}>{item}</option>)}</select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="input min-w-44"><option value="newest">Newest first</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="name">Name A-Z</option></select>
              </div>
            </div>
            {loading ? <Loader label="Loading the collection" /> : error ? <div className="my-14 rounded-2xl bg-red-50 p-8 text-center text-red-700">{error}</div> : data.products.length ? (
              <>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{data.products.map((product) => <ProductCard key={product._id} product={product} />)}</div>
                {data.pagination.pages > 1 && <div className="mt-12 flex justify-center gap-2">{Array.from({ length: data.pagination.pages }, (_, index) => index + 1).map((value) => <button key={value} onClick={() => setPage(value)} className={`h-11 w-11 rounded-xl text-sm font-bold ${page === value ? "bg-ink text-white" : "border border-slate-200 text-ink hover:bg-mist"}`}>{value}</button>)}</div>}
              </>
            ) : <div className="my-14 rounded-3xl bg-mist p-12 text-center"><FiSearch className="mx-auto text-4xl text-slate-300" /><h3 className="mt-4 text-xl font-bold text-ink">No products found</h3><p className="mt-2 text-sm text-slate-500">Try a different search or category.</p></div>}
          </div>
        </section>

        <section className="container-page pb-24">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
            <div className="relative"><p className="eyebrow">Need a recommendation?</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-5xl">Let’s find the right gadget for your budget.</h2><p className="mx-auto mt-5 max-w-xl text-slate-300">Tell us what you need. We’ll help you compare options and make a confident choice.</p><a href={whatsappConversationLink()} target="_blank" rel="noreferrer" className="btn-accent mt-8 px-7 py-4">Start a conversation <FiArrowRight /></a></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
