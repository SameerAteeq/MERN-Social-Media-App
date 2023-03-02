import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const userChatsApi = (id) => Api.get(`/chat/${id}`);

export const createChatApi = (id, userId) =>
  Api.post(`/chat`, { senderId: id, recieverId: userId });
