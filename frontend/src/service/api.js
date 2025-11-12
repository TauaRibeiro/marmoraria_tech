import axios from 'axios'

const api = axios.create({
  baseURL: "https://marmoraria-tech.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (!token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (erro) => {
    return Promise.reject(erro)
  },
)

export default api
