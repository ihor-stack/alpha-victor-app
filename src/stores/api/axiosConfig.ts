import axios from 'axios';

export const adminAPI = axios.create({
  baseURL: `https://alphavictor-dev.azurewebsites.net/api/admin`,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJvaWQiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJzdWIiOiJjMjZiMWI0ZS0yNDBmLTRiNzQtYTVkZC1iMWM0YzFhZTg2NDEiLCJnaXZlbl9uYW1lIjoiTWFyY3VzIiwidGZwIjoiQjJDXzFfU2lnblVwU2lnbkluIiwic2NwIjoiYWxwaGF2aWN0b3IiLCJhenAiOiI2YzY5MGY5NC1kOTU4LTQyZWItOWFjOC1mNGI0NTAzMzc3MTQiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE2ODI3MDk5MTYsImF1ZCI6IjZjNjkwZjk0LWQ5NTgtNDJlYi05YWM4LWY0YjQ1MDMzNzcxNCIsImV4cCI6MTY4MjcxMzUxNiwiaXNzIjoiaHR0cHM6Ly9hbHBoYXZpY3RvcmRldi5iMmNsb2dpbi5jb20vMzcyMzhjYWItMGZjMi00MjUyLTg4Y2MtMzQ3Mzg1MmI3MTViL3YyLjAvIiwibmJmIjoxNjgyNzA5OTE2fQ.kPcJJ0lU56z92u95aAOX_8HVjTuYu-lDg_FMZ3wTK2OccckgNJlYPygcZZ5-Wz0FmYjPxRC7HSUfaO4MHXcws7_hOX3irx00JEGPMtDSFxcW0G9_Qs0P11zoR2iyPm7Fo3jzhddENsD4q4wIP46J1WnNCZxt3X7KEeB4b-XE2qNBJgeiOFFB2PTWdki_k64rl3qfhhzFxtWHw7MVbCLOs--vRCyR7BB46ETF5Ju9AYRK7RlRdWUzMYqeoDWS3vcGsi0dS6YCEPC8AUCe6d-IOA-jWOlH3YHr_ZerxAup9belS_xFNdeIWj46fyI4eZvVfyXP8CSmdEHxUEYmk_aA6g'
  }
})