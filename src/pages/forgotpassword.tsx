import { Form, Input, Button } from 'antd'

import AppLayout from 'components/AppLayout'
import api from 'services/api'

const ForgotPassword:React.FC = () => {
  const [ form ] = Form.useForm()

  const handleSubmit = async () => {
    const data = await form.validateFields()
    const resp = await api.get('/auth/forgotpassword')

    console.log(resp.data)
  }

  return (
    <AppLayout title="Esqueci a senha | ClassifiKa">
      <Form form={form}>
        <Form.Item name="email">
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Button htmlType="submit" onClick={handleSubmit}>
          Enviar requisição
        </Button>
      </Form>
    </AppLayout>
  )
}

export default ForgotPassword