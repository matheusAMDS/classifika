import axios from 'axios'

const api = axios.create({
  baseURL: 'https://classifika.vercel.app/api'
})

export default api
