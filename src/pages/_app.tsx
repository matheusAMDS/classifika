import { AppProps } from 'next/app'

import { AuthProvider } from 'contexts/AuthContext'

import 'antd/dist/antd.css'

const App:React.FC<AppProps> = ({ Component, pageProps }) => {
  if (!process.browser) 
    return <Component {...pageProps} />
    
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  ) 
}

export default App