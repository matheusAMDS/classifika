import { createContext, useState, Dispatch, SetStateAction } from 'react'
import jwt from 'jsonwebtoken'

import { Decoded } from 'middlewares/auth'

interface Auth {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  getToken: () => string|null;
  setToken: (token:string) => void;
  logout: () => void;
}

export const AuthContext = createContext<Auth>({
  isLogged: undefined, 
  setIsLogged: undefined,
  getToken: undefined,
  setToken: undefined,
  logout: undefined
})

export const AuthProvider:React.FC = ({ children }) => {
  const tokenPersisted = localStorage.getItem('token')
  let authPersisted
  
  if (tokenPersisted !== null) {
    try {
      const decoded = jwt.decode(tokenPersisted) as Decoded
      const timeNow = Math.floor(Date.now() / 1000)
      
      authPersisted = decoded.exp > timeNow
      
      if (!authPersisted) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } catch (error) {
      if (error.name === "TokenExpiredError")
        authPersisted = null
    }
  }
    
  const [ isLogged, setIsLogged ] = useState(authPersisted)

  return (
    <AuthContext.Provider value={{ 
      isLogged, 
      setIsLogged,
      getToken: () => isLogged ? localStorage.getItem('token') : null,
      setToken: (token:string) => localStorage.setItem('token', token),
      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLogged(false)
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
