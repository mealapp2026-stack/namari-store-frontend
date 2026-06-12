import api from "./axios";

export const loginAdmin = async (credentials) => (await api.post("/auth/login", credentials)).data;
export const getCurrentAdmin = async () => (await api.get("/auth/me")).data;
