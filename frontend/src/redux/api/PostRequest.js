import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const getTimeLinePostApi = (id) => Api.get(`/post/${id}/timeline`);

export const likePostApi = (id, userId) =>
  Api.put(`post/${id}/like`, { userId: userId });
