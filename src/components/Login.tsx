import { Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useContext } from 'react'

import ModalForm from 'components/ModalForm'

import api from 'services/api'
import { AuthContext } from 'contexts/AuthContext'
import layout from 'styles/layout.module.css'

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    password: string;
  }
}

const LogIn:React.FC = () => {
  const { setIsLogged } = useContext(AuthContext)
  const [ form ] = Form.useForm()

  const handleSubmit = async () => {
    const values = await form.validateFields()
    
    try {
      const response = await api.post<LoginResponse>('/auth/login', values)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setIsLogged(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalForm
      title="Login"
      label="Login"
      handleSubmit={handleSubmit}
      className={layout.navbar_actions}
      width="600px"
    >
      <Form
        form={form}
        wrapperCol={{ span: 24, style: { margin: '0 auto' } }}
      >
        <Form.Item name="email">
          <Input
            prefix={<MailOutlined />} 
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input 
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Link href="/forgotpassword">
          <a>Esqueci minha senha</a>
        </Link>
      </Form>
    </ModalForm>
  )
}

export default LogIn