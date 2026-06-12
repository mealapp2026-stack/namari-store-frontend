import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { updateProduct } from "../api/productApi";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import { useNotification } from "../context/NotificationContext";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { notify } = useNotification();

  useEffect(() => {
    api.get("/admin/products").then(({ data }) => {
      const found = data.products.find((item) => item._id === id);
      if (!found) throw new Error("Product not found");
      setProduct(found);
    }).catch((err) => {
      notify(err.response?.data?.message || err.message || "Unable to load product", "error");
      navigate("/admin/products");
    });
  }, [id, navigate, notify]);

  const submit = async (data) => {
    setSubmitting(true);
    try {
      await updateProduct(id, data);
      notify("Product updated");
      navigate("/admin/products");
    } catch (err) {
      notify(err.response?.data?.message || "Unable to update product", "error");
    } finally { setSubmitting(false); }
  };

  if (!product) return <Loader label="Loading product" />;
  return <div><div className="mb-7"><h2 className="text-2xl font-extrabold text-ink">Edit product</h2><p className="mt-1 text-sm text-slate-500">Update product details and storefront visibility.</p></div><ProductForm initialData={product} onSubmit={submit} submitting={submitting} submitLabel="Save changes" /></div>;
}
