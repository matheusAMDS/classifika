import { Form, Typography, Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'

import AppLayout from 'components/AppLayout'
import Input from 'components/Input'
import ModalButton from 'components/ModalButton'

import styles from 'styles/form.module.css'
import { AuthContext } from 'contexts/AuthContext'
import { LoginParams } from 'services/Auth'
import api from 'services/api'

const { Title } = Typography

const Login: React.FC = () => {
  const router = useRouter()
  const [ form ] = Form.useForm()
  const Auth = useContext(AuthContext)

  const [ forgotPassEmail, setForgotPassEmail ] = useState('')

  const handleLoginSubmit = async () => {
    try {
      const data = await form.validateFields()
    
      await Auth.login(data as LoginParams)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleEmailForgotPassword = async () => {
    try {
      await api.post('/auth/forgotpassword', { email: forgotPassEmail })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <AppLayout title="Entrar">
      <Title className={styles.title}>Entrar</Title>
      <Form
        className={styles.form}
        form={form}
        layout="vertical"
        onFinish={handleLoginSubmit}
      >
        <Form.Item name="email">
          <Input
            icon={<MailOutlined />} 
            type="email"
            label="Email"
          />
        </Form.Item>
        
        <Form.Item name="password">
          <Input
            icon={<LockOutlined />}
            type="password"
            label="Senha"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary" 
            size="large" 
            style={{ width: '100%'}}
          >
            Entrar
          </Button>
        </Form.Item>

        <ModalButton
          buttonLabel="Esqueci minha senha"
          type="link"
          onOk={handleEmailForgotPassword}
          onOkLabel="Enviar email"
          title="Redefinir senha"
        >
          <Input
            label="Email"
            type="email"
            icon={<MailOutlined />}
            onChange={setForgotPassEmail} 
          />
        </ModalButton>
        
        <Link href="/signup">
          <a className={styles.link}>Ainda não estou cadastrado</a>
        </Link>
      </Form>
    </AppLayout>
  )
}

export default Login