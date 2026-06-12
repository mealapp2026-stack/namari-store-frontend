import { useState } from "react";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail, FiShoppingBag } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return setError("Email and password are required");
    setLoading(true); setError("");
    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-mist lg:grid-cols-2">
      <section className="hidden bg-ink p-12 lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-3 text-white"><span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan text-ink"><FiShoppingBag /></span><span className="text-xl font-extrabold tracking-wider">NAMARI STORE</span></Link>
        <div className="my-auto max-w-xl"><p className="eyebrow">Store management</p><h1 className="mt-5 text-5xl font-extrabold leading-tight text-white">Everything you need to manage your gadget collection.</h1><p className="mt-6 text-lg leading-8 text-slate-300">Publish products, control visibility, update inventory, and keep your storefront current.</p></div>
        <p className="text-xs text-slate-500">Secure administrator access</p>
      </section>
      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ink"><FiArrowLeft /> Back to store</Link>
          <p className="eyebrow">Welcome back</p><h1 className="mt-3 text-4xl font-extrabold text-ink">Admin sign in</h1><p className="mt-3 text-sm text-slate-500">Enter your credentials to access the dashboard.</p>
          {error && <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block"><span className="label">Email address</span><span className="relative block"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" className="input pl-11" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@namari.store" autoComplete="email" /></span></label>
            <label className="block"><span className="label">Password</span><span className="relative block"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type={showPassword ? "text" : "password"} className="input px-11" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your secure password" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <FiEyeOff /> : <FiEye />}</button></span></label>
            <button className="btn-primary w-full py-4" disabled={loading}>{loading ? "Signing in..." : "Sign in to dashboard"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
