import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

export const UploadImageApi = (data) => Api.post("/upload/", data);

export const UploadPostApi = (data) => Api.post("/post", data);
