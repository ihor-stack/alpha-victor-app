import axios from 'axios';

export const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
  headers: {
  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJvaWQiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJzdWIiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJnaXZlbl9uYW1lIjoiTWFyY3VzIiwidGZwIjoiQjJDXzFfU2lnblVwU2lnbkluIiwic2NwIjoiYWxwaGF2aWN0b3IiLCJhenAiOiI2YzY5MGY5NC1kOTU4LTQyZWItOWFjOC1mNGI0NTAzMzc3MTQiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2ODI3ODE5MTYsImF1ZCI6IjZjNjkwZjk0LWQ5NTgtNDJlYi05YWM4LWY0YjQ1MDMzNzcxNCIsImV4cCI6MTY4Mjc4NTUxNiwiaXNzIjoiaHR0cHM6Ly9hbHBoYXZpY3RvcmRldi5iMmNsb2dpbi5jb20vMzcyMzhjYWItMGZjMi00MjUyLTg4Y2MtMzQ3Mzg1MmI3MTViL3YyLjAvIiwibmJmIjoxNjgyNzgxOTE2fQ.PSqMP0zYK7k9ahAB-bMCuHhmike9QA2dTwapRpiZWpVksyIn5LW0Mm6pX7R9pggXwzXDUFulx5kS_2etkGCop9n-AwH8UA_WSMEoXuYCG5fNOlH_9ANs0jRI1KVJ7T9B7yYkvt24skFNmDu7ccUiutg9Bp5xHW4d-03a9TSG0BpD2loy0AUlLV89P0MtwwuEwllr2_mJcT4s4ODdTPnr-aHO6sXnQu2OJsaSkM5YU3tmxlF7WtfbZdBgnaHfXHvUgCTCogR3rZO8mxLpVOlFo3oIK_Ahvut9gKI3mxaR0qn-LqFOr3QNo5-OxSfI_-oew1PqAb_j2cgAbP45igq0Mw'
  }
})