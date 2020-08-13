import { Form, Button, Typography } from 'antd'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import Input from 'components/Input'

import api from 'services/api'
import jwt from 'jsonwebtoken'
import styles from 'styles/form.module.css'
import authConfig from 'config/auth'

interface Props {
  SECRET: string;
}

interface Data {
  newpassword: string;
  confirmnewpassword: string;
}

interface DecodedForgotEmail {
  email: string;
}

const { Title } = Typography

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      SECRET: authConfig.email.SECRET
    }
  }
} 

const ForgotPassword:React.FC<Props> = ({ SECRET }) => {
  const router = useRouter()
  const token = router.query.token as string
  const [ form ] = Form.useForm()
  const [ email, setEmail ] = useState('')

  useEffect(() => {   
    try {
      if (token) {
        jwt.verify(token, SECRET, (err, decoded: DecodedForgotEmail) => {
          if (err)
            throw err 
    
          setEmail(decoded.email)
        })
      }
    } catch (error) {
      alert(error.message)
      router.push('/login')
    }
  }, [ token ])

  const handleSubmit = async () => {
    const { confirmnewpassword, newpassword } = await form.validateFields() as Data

    if (confirmnewpassword !== newpassword)
      alert('putz')

    else {
      try {
        await api.put('/auth/forgotpassword', { email, newpassword })

        router.push('/login')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <AppLayout title="Esqueci a senha | ClassifiKa">
      <Typography>
        <Title className={styles.title}>Redefinir senha</Title>
      </Typography>
      <Form 
        form={form} 
        layout="vertical" 
        className={styles.form}
        onFinish={handleSubmit}
      >
        <Form.Item name="newpassword">
          <Input label="Nova senha" type="password" />
        </Form.Item>
        <Form.Item name="confirmnewpassword">
          <Input label="Confirmar nova senha" type="password" />
        </Form.Item>
        <Button 
          htmlType="submit" 
          className={styles.submit} 
          type="primary" 
          size="large"
        >
          Enviar requisição
        </Button>
      </Form>
    </AppLayout>
  )
}

export default ForgotPassword