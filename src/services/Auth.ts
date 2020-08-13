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
    const response = await api.post<SessionResponse>('/auth/login', params)

    return response.data
  }
  
  async signup(params:SignUpParams) {
    const response = await api.post<SessionResponse>('/auth/signup', params)

    return response.data
  }
}

export default new Auth()