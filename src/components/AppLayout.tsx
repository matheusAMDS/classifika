import { Layout, Menu, Anchor, Button } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import { useContext } from 'react'

import Login from 'components/Login'
import Signup from 'components/Signup'
import NewPublicity from 'components/NewPublicity'

import layout from 'styles/layout.module.css'
import { AuthContext } from 'contexts/AuthContext'

interface Props {
  title?: string;
}

const { Content, Footer, Header } = Layout

const AppLayout:React.FC<Props> = ({ children, title }) => {
  const { isLogged, logout } = useContext(AuthContext)

  return (
    <Layout className={layout.container}>
      <Head>
        <title>{title}</title>
      </Head>
      
      <Header className={layout.header}>
        <Link href="/">
          <h1 className={layout.logo}>
            ClassifiKa
          </h1>
        </Link>
        
        <Menu mode='horizontal' theme="dark" className={layout.navbar}>
          <Menu.Item key='home'>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='sobre'>
            <Link href="/sobre">
              <a>Sobre</a>
            </Link>
          </Menu.Item>
        </Menu>

        <div>
          { !isLogged ? (
            <>
              <Signup />
              <Login />
            </>
          ) : (
            <>
              <NewPublicity />
              <Button 
                onClick={logout} 
                className={layout.navbar_actions}
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </Header>
      
      <Content className={layout.content}>
        {children}
      </Content>
      
      <Footer>
        <Anchor className={layout.anchor}>
          <Anchor.Link
            href="https://github.com/matheusAMDS" 
            title="Criado por Matheus Andrade"
          />
        </Anchor>
      </Footer>
    </Layout>
  )
}

export default AppLayout