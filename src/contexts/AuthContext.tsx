import { createContext, useState } from 'react'

import { verifyIsExpired } from 'lib/jwt'
import Auth, { LoginParams, SignUpParams } from 'services/Auth'

interface AuthContext {
  isLogged: boolean;
  login: (params:LoginParams) => Promise<void>;
  signup: (params:SignUpParams) => Promise<void>;
  getToken: () => string|null;
  logout: () => void;
}

function verifyPersistedAuth() {
  const tokenPersisted = localStorage.getItem('token')

  if (tokenPersisted !== null)
    return !verifyIsExpired(tokenPersisted)

  return false
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider:React.FC = ({ children }) => {
  const [ isLogged, setIsLogged ] = useState(verifyPersistedAuth())

  return (
    <AuthContext.Provider value={{ 
      isLogged,
      getToken: () => isLogged ? localStorage.getItem('token') : null,
      login: async data => {
        const response = await Auth.login(data)
    
        setIsLogged(true)
        localStorage.setItem('token', response.token)
      },
      signup: async data => {
        const response = await Auth.signup(data)
    
        setIsLogged(true)
        localStorage.setItem('token', response.token)
      },
      logout: () => {
        localStorage.removeItem('token')
        setIsLogged(false)
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
