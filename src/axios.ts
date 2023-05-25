import axios, { AxiosRequestConfig } from "axios";
import Auth from "@/auth";

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

publicAPI.interceptors.request.use(async (c) => {
  const accessToken = await authService.fetchCurrentAccessToken();

  if (accessToken) {
    c.headers.Authorization = `Bearer ${accessToken}`;
  }

  return c;
});

export { adminAPI, publicAPI };
