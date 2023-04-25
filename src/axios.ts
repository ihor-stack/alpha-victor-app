import axios from 'axios';

export const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
  headers: {
    Authorization: 'Bearer {token}',
    client_id: '6c690f94-d958-42eb-9ac8-f4b450337714'
  }
})