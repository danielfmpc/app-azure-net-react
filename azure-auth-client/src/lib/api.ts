import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5041/",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");

      window.location.href = "/"; 

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
