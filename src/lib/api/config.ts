import axios from "axios";

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || "/";
// const baseURL = "/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error({ error });
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh-token");
      localStorage.removeItem("token");
      if (refreshToken) {
        api.post("/auth/refresh", { refreshToken }).then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refresh-token", data.refreshToken);
        });
      } else {
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export { api };
