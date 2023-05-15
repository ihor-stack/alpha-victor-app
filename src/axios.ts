import axios, { AxiosRequestConfig } from 'axios';
import Auth from '@/auth';

const adminAPIAxios = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`
});

const authService = new Auth();

export const adminAPI = async (config : AxiosRequestConfig) => {

  const accessToken = await authService.fetchCurrentAccessToken();

  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`
    };
  }

  return await adminAPIAxios(config);   

}