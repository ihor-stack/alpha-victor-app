import axios from 'axios';

export const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
  headers: {
  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJvaWQiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJzdWIiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJnaXZlbl9uYW1lIjoiTWFyY3VzIiwidGZwIjoiQjJDXzFfU2lnblVwU2lnbkluIiwic2NwIjoiYWxwaGF2aWN0b3IiLCJhenAiOiI2YzY5MGY5NC1kOTU4LTQyZWItOWFjOC1mNGI0NTAzMzc3MTQiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2ODMzOTk2MTQsImF1ZCI6IjZjNjkwZjk0LWQ5NTgtNDJlYi05YWM4LWY0YjQ1MDMzNzcxNCIsImV4cCI6MTY4MzQwMzIxNCwiaXNzIjoiaHR0cHM6Ly9hbHBoYXZpY3RvcmRldi5iMmNsb2dpbi5jb20vMzcyMzhjYWItMGZjMi00MjUyLTg4Y2MtMzQ3Mzg1MmI3MTViL3YyLjAvIiwibmJmIjoxNjgzMzk5NjE0fQ.TA-6WEh4v0ckQmPReqYH2E9phZH7L-XvuSzu22s1aCE9AYNRU7SeU4vNuPlXZrIeR_Mx3bvu72g9_F4RyvaD9Y7Y9At2BHY_i4KVaQZgMjBILvzKsQGvKL2TAJaeumFqlTOBSWzC7d08Bk8vjP-0UBZDO4-sTXVGDxkllGDadEBICPNirdrIRzEEZ_x99v-v4bdebSgnbO-5rh-fD7ADQP862k1iDSUpgCLaOZIfyBQetJZ2VHiYeMaU4_K6m9cStXSoNGz1XH9Utt1OJsYXWkgBM5oKQts2nDY-k0zo9ZxnL-71-AUtF6Fhbk5e4dRNSU1MClU4DxbHKEqloIVsiQ'
  }
})