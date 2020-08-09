import api from 'services/api'

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SessionResponse {
  token: string;
}

class Auth {
  async login(params:LoginParams) {
    try {
      const response = await api.post<SessionResponse>('/auth/login', params)
  
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  
  async signup(params:SignUpParams) {
    try {
      const response = await api.post<SessionResponse>('/auth/login', params)
  
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Auth()