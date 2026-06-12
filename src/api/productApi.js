import api from "./axios";

export const fetchProducts = async (params = {}) => (await api.get("/products", { params })).data;
export const fetchProduct = async (id) => (await api.get(`/products/${id}`)).data;
export const fetchAdminProducts = async () => (await api.get("/admin/products")).data;
export const createProduct = async (data) => (await api.post("/admin/products", data)).data;
export const updateProduct = async (id, data) => (await api.put(`/admin/products/${id}`, data)).data;
export const deleteProduct = async (id) => (await api.delete(`/admin/products/${id}`)).data;
export const toggleProduct = async (id) =>
  (await api.patch(`/admin/products/${id}/toggle-status`)).data;
