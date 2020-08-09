import { Form, Typography, Button } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useContext } from 'react'

import AppLayout from 'components/AppLayout'
import Input from 'components/Input'

import styles from 'styles/form.module.css'
import { AuthContext } from 'contexts/AuthContext'
import { LoginParams } from 'services/Auth'

const { Title } = Typography

const Login: React.FC = () => {
  const router = useRouter()
  const [ form ] = Form.useForm()
  const Auth = useContext(AuthContext)

  const onFinish = async () => {
    const data = await form.validateFields()

    await Auth.login(data as LoginParams)
    router.push('/')
  }

  const onFailed = () => {
    alert('opsie')
    form.resetFields()
  }

  return (
    <AppLayout title="Entrar">
      <Title className={styles.title}>Entrar</Title>
      <Form
        className={styles.form}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFailed}
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

        <Link href="/forgotpassword">
          <a className={styles.link}>Esqueci minha senha</a>
        </Link>

        <Link href="/signup">
          <a className={styles.link}>Ainda não estou cadastrado</a>
        </Link>
      </Form>
    </AppLayout>
  )
}

export default Login