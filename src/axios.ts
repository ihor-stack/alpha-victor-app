import axios, { AxiosRequestConfig } from "axios";
import Auth from "@/auth";

const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
});

const authService = new Auth();

adminAPI.interceptors.request.use(async (c) => {
  const accessToken = await authService.fetchCurrentAccessToken();

  if (accessToken) {
    c.headers.Authorization = `Bearer ${accessToken}`;
  }

  return c;
});

export { adminAPI };
