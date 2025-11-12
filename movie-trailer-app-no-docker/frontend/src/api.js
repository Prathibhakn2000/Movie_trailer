import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

export function searchMovies(q, page = 1) {
  return axios.get(`${API_BASE}/search`, { params: { q, page } }).then(r => r.data)
}
export function popular(page = 1) {
  return axios.get(`${API_BASE}/popular`, { params: { page } }).then(r => r.data)
}
export function genres() { return axios.get(`${API_BASE}/genres`).then(r=>r.data) }
export function getTrailer(tmdb_id) { return axios.get(`${API_BASE}/trailer/${tmdb_id}`).then(r=>r.data) }
export function listFavs() { return axios.get(`${API_BASE}/favorites`).then(r=>r.data) }
export function addFav(payload) { return axios.post(`${API_BASE}/favorites`, payload).then(r=>r.data) }
export function removeFav(id) { return axios.delete(`${API_BASE}/favorites/${id}`).then(r=>r.data) }
