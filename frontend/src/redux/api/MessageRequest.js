import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const getMessages = (id) => Api.get(`/message/${id}`);

export const AddMessage = (data) => Api.post(`/message/`, data);
