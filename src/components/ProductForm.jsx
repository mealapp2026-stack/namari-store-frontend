import { useEffect, useState } from "react";
import { FiImage, FiPlus, FiSave, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  brand: "",
  description: "",
  stockStatus: "In Stock",
  isActive: true,
  isFeatured: false,
  image: "",
  imageFile: null,
  specifications: [{ key: "", value: "" }],
};

export default function ProductForm({ initialData, onSubmit, submitting, submitLabel }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;
    setForm({
      ...emptyForm,
      ...initialData,
      price: String(initialData.price),
      imageFile: null,
      specifications: initialData.specifications?.length
        ? initialData.specifications
        : [{ key: "", value: "" }],
    });
    setPreview(initialData.image || "");
  }, [initialData]);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const selectImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm((current) => ({ ...current, imageFile: file }));
    setPreview(URL.createObjectURL(file));
    setErrors((current) => ({ ...current, image: "" }));
  };

  const updateSpec = (index, field, value) => {
    setForm((current) => ({
      ...current,
      specifications: current.specifications.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addSpec = () =>
    setForm((current) => ({
      ...current,
      specifications: [...current.specifications, { key: "", value: "" }],
    }));

  const removeSpec = (index) =>
    setForm((current) => ({
      ...current,
      specifications: current.specifications.filter((_, itemIndex) => itemIndex !== index),
    }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required";
    if (!form.price || Number(form.price) <= 0) next.price = "Enter a price greater than 0";
    if (!form.category.trim()) next.category = "Category is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.imageFile && !form.image) next.image = "Product image is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const data = new FormData();
    ["name", "price", "category", "brand", "description", "stockStatus", "isActive", "isFeatured"].forEach(
      (key) => data.append(key, form[key]),
    );
    data.append(
      "specifications",
      JSON.stringify(form.specifications.filter((item) => item.key.trim() && item.value.trim())),
    );
    if (form.imageFile) data.append("imageFile", form.imageFile);
    else if (form.image) data.append("image", form.image);
    onSubmit(data);
  };

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-ink">Product information</h2>
          <p className="mt-1 text-sm text-slate-500">The essential details customers will see.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Product name" error={errors.name}>
              <input className="input" name="name" value={form.name} onChange={update} placeholder="e.g. Apple iPhone 16 Pro" />
            </Field>
            <Field label="Brand">
              <input className="input" name="brand" value={form.brand} onChange={update} placeholder="e.g. Apple" />
            </Field>
            <Field label="Price (NGN)" error={errors.price}>
              <input className="input" name="price" type="number" min="1" value={form.price} onChange={update} placeholder="1250000" />
            </Field>
            <Field label="Category" error={errors.category}>
              <input className="input" name="category" value={form.category} onChange={update} placeholder="e.g. Smartphones" />
            </Field>
            <Field label="Availability">
              <select className="input" name="stockStatus" value={form.stockStatus} onChange={update}>
                <option>In Stock</option><option>Out of Stock</option><option>Pre Order</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3 pt-7">
              <Toggle label="Active" name="isActive" checked={form.isActive} onChange={update} />
              <Toggle label="Featured" name="isFeatured" checked={form.isFeatured} onChange={update} />
            </div>
          </div>
          <div className="mt-5">
            <Field label="Description" error={errors.description}>
              <textarea className="input min-h-36 resize-y" name="description" value={form.description} onChange={update} placeholder="Describe the product, its condition, and why it stands out." />
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-ink">Specifications</h2><p className="mt-1 text-sm text-slate-500">Add technical details that support buying decisions.</p></div>
            <button type="button" className="btn-secondary px-3 py-2" onClick={addSpec}><FiPlus /> Add</button>
          </div>
          <div className="mt-6 space-y-3">
            {form.specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_42px] gap-2">
                <input className="input" value={spec.key} onChange={(event) => updateSpec(index, "key", event.target.value)} placeholder="Storage" />
                <input className="input" value={spec.value} onChange={(event) => updateSpec(index, "value", event.target.value)} placeholder="256 GB" />
                <button type="button" onClick={() => removeSpec(index)} disabled={form.specifications.length === 1} className="grid place-items-center rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 disabled:opacity-30" aria-label="Remove specification"><FiTrash2 /></button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-ink">Product image</h2>
          <label className="mt-5 block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-mist transition hover:border-cyan">
            {preview ? (
              <img src={preview} alt="Product preview" className="aspect-square w-full object-cover" />
            ) : (
              <div className="grid aspect-square place-items-center p-8 text-center">
                <div><FiImage className="mx-auto text-4xl text-slate-300" /><p className="mt-3 text-sm font-bold text-ink">Choose an image</p><p className="mt-1 text-xs text-slate-400">JPG, PNG or WEBP. Max 5MB.</p></div>
              </div>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={selectImage} />
          </label>
          <label className="btn-secondary mt-3 w-full cursor-pointer"><FiUploadCloud /> {preview ? "Replace image" : "Upload image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={selectImage} /></label>
          {errors.image && <p className="mt-2 text-xs font-semibold text-red-500">{errors.image}</p>}
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-ink">Publishing</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Active products are visible in the public store. New products start active by default.</p>
          <button className="btn-primary mt-5 w-full" disabled={submitting}><FiSave /> {submitting ? "Saving product..." : submitLabel}</button>
          <Link to="/admin/products" className="btn-secondary mt-3 w-full">Cancel</Link>
        </section>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return <label className="block"><span className="label">{label}</span>{children}{error && <span className="mt-1 block text-xs font-semibold text-red-500">{error}</span>}</label>;
}

function Toggle({ label, ...props }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="relative h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-cyan after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
      {label}
    </label>
  );
}
