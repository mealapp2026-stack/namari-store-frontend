import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";
import { useNotification } from "../context/NotificationContext";

export default function CreateProduct() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { notify } = useNotification();

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await createProduct(data);
      notify("Product created and published");
      navigate("/admin/products");
    } catch (err) {
      notify(err.response?.data?.message || "Unable to create product", "error");
    } finally { setSubmitting(false); }
  };

  return <div><div className="mb-7"><h2 className="text-2xl font-extrabold text-ink">Add a new product</h2><p className="mt-1 text-sm text-slate-500">New products are active and visible by default.</p></div><ProductForm onSubmit={submit} submitting={submitting} submitLabel="Create product" /></div>;
}
