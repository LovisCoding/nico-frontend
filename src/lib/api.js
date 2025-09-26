'use client';
import axios from 'axios';


const api = axios.create({
  baseURL: "/api/",
})
// Ajouter le token d'authentification si présent
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Gérer la redirection vers la page de login si nécessaire
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;