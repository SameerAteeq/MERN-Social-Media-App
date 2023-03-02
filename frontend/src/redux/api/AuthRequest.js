import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const loginApi = (formData) => Api.post("/auth/login", formData);
export const SignUpApi = (formData) => Api.post("/auth/register", formData);
