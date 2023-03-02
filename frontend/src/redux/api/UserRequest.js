import axios from "axios";

const Api = axios.create({ baseURL: "http://localhost:5000" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }

  return req;
});

export const getUser = (userId) => Api.get(`/user/${userId}`);

export const UpdateUserApi = (id, formData) => Api.put(`/user/${id}`, formData);

export const getAllUsersApi = () => Api.get("/user");

export const followUserApi = (id, data) => Api.put(`/user/${id}/follow`, data);

export const unFollowUserApi = (id, data) =>
  Api.put(`/user/${id}/unfollow`, data);
