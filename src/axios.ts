import axios, { AxiosRequestConfig } from "axios";
import Auth from "@/auth";
import toastService from "@/services/toastService";
import loadingService from "@/services/loadingService";
import * as Sentry from "@sentry/capacitor";
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
  const status = error.response?.status;
  let message = error;
  if (error.config.headers['X-AV-ErrorHandler'] === 'shortcode') {
    toastService.show(
      "No Spaces Found",
      "We couldn't find any spaces by that shortcode",
      "error",
      "bottom"
    );
  } else {
    switch (status) {
      case 401:
        message = "Your login session has expired, please login again";
        router.push("/");
        break;
      case 403:
        message = "You don't have permission to access this resource";
        break;
      case 404:
        message = "Sorry, that can't be found";
        break;
      case 408:
        message = "The server timed out waiting for the request";
        break;
      case 422:
        message = "The request was understood, but it could not be processed";
        break;
      case 500:
        message = "Whoops, something went wrong. Please try again later";
        break;
      default:
        message =
          error.response?.data ||
          error.response?.data?.message ||
          error.response?.data?.title ||
          "An unknown error occurred";
        break;
    }
    toastService.show("Error", message, "error", "bottom");
    Sentry.captureException(error);
  }

  loadingService.closeAll();
};

export { adminAPI, publicAPI };
