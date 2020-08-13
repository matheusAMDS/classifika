import { Form, Typography, Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

import AppLayout from 'components/AppLayout'
import Input from 'components/Input'

import styles from 'styles/form.module.css'
import { AuthContext } from 'contexts/AuthContext'
import { SignUpParams } from 'services/Auth'

const { Title } = Typography

const SignUp: React.FC = () => {
  const router = useRouter()
  const [ form ] = Form.useForm()
  const Auth = useContext(AuthContext)

  const onFinish = async () => {
    try {
      const data = await form.validateFields()

      await Auth.signup(data as SignUpParams)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <AppLayout title="Cadastrar">
      <Title className={styles.title}>Cadastrar</Title>
      <Form
        className={styles.form}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item name="name">
          <Input
            icon={<UserOutlined />} 
            type="text"
            label="Nome completo"
          />
        </Form.Item>

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
            Cadastrar
          </Button>
        </Form.Item>

        <Link href="/login">
          <a className={styles.link}>Já possuo um cadastro</a>
        </Link>
      </Form>
    </AppLayout>
  )
}

export default SignUp