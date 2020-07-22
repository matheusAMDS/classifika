import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
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

const Signup:React.FC = () => {
  const { setIsLogged } = useContext(AuthContext)
  const [ form ] = Form.useForm()

  const handleSubmit = async () => {
    const values = await form.validateFields()
    
    try {
      const response = await api.post<LoginResponse>('/auth/signup', values)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setIsLogged(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalForm
      title="Cadastro"
      label="Cadastrar"
      type="primary"
      handleSubmit={handleSubmit}
      className={layout.navbar_actions}
    >
      <Form
        form={form}
        wrapperCol={{ span: 24, style: { margin: '0 auto' } }}
      >
        <Form.Item name="name">
          <Input
            prefix={<UserOutlined />} 
            type="text"
            placeholder="Nome"
          />
        </Form.Item>
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
      </Form>
    </ModalForm>
  )
}

export default Signup