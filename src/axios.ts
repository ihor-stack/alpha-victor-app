import axios from 'axios';

export const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
  headers: {
  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJvaWQiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJzdWIiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJnaXZlbl9uYW1lIjoiTWFyY3VzIiwidGZwIjoiQjJDXzFfU2lnblVwU2lnbkluIiwic2NwIjoiYWxwaGF2aWN0b3IiLCJhenAiOiI2YzY5MGY5NC1kOTU4LTQyZWItOWFjOC1mNGI0NTAzMzc3MTQiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2ODMzMTc4NjgsImF1ZCI6IjZjNjkwZjk0LWQ5NTgtNDJlYi05YWM4LWY0YjQ1MDMzNzcxNCIsImV4cCI6MTY4MzMyMTQ2OCwiaXNzIjoiaHR0cHM6Ly9hbHBoYXZpY3RvcmRldi5iMmNsb2dpbi5jb20vMzcyMzhjYWItMGZjMi00MjUyLTg4Y2MtMzQ3Mzg1MmI3MTViL3YyLjAvIiwibmJmIjoxNjgzMzE3ODY4fQ.dplAFtTSY7mMDQoxl_D_7bNDLcD3oDSaOvgUuAbg-hV9Hrg6MjfppGh91FhliItU4vHqymCFol_W4Xi1OdyEP9lgK2LME1JE1LQ9jael62epBIXznGhMpJevc_D-u3TXwtaPHEGwKHZ6OLxRwwsnnzvOB8ayJWsNqZEbwPGKKBwxE6sXfQIpS0O3mteCZ088yIbs2b82QEAk8lHm62Z3unmjdIbjeDaWgddXjgJdr20_ljXi0B0JJtTJWHaF_veoLCCjPHEPc_MiDUp4yZq_u8teUoqpK40oKfDjWIj7l9wScLIfeZ8r-xWnLZsJEUgNZoVIZbLMVqt-8u7dn1LbOQ'
  }
})