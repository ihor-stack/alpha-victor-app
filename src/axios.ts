import axios, { AxiosRequestConfig } from "axios";
import Auth from "@/auth";
import toastService from "@/services/toastService";
import router from "./router";

const adminAPI = axios.create({
  baseURL: process.env.VUE_APP_API_ADMIN_URL,
});

const publicAPI = axios.create({
  baseURL: process.env.VUE_APP_API_PUBLIC_URL,
});

const authService = new Auth();

adminAPI.interceptors.request.use(async (c) => {
  const accessToken = await authService.fetchCurrentAccessToken();

  if (accessToken) {
    c.headers.Authorization = `Bearer ${accessToken}`;
  }

  return c;
});

adminAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

publicAPI.interceptors.request.use(async (c) => {
  const accessToken = await authService.fetchCurrentAccessToken();

  if (accessToken) {
    c.headers.Authorization = `Bearer ${accessToken}`;
  }

  return c;
});

publicAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

const handleError = (error: any) => {
  if (error.response.status === 401) {
    toastService.show(
      "Error",
      error.response.status === 401
        ? "Your login session has expired, please login again"
        : error,
      "error",
      "top"
    );
    router.push("/");
  } else {
    toastService.show(
      "Error",
      error.response?.data || error.response?.data?.message || error.response?.data?.title || error,
      "error",
      "top"
    );
  }
};

export { adminAPI, publicAPI };
