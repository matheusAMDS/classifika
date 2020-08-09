import { Select, Upload, Form, Button, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

import AppLayout from 'components/AppLayout'
import Input from 'components/Input'

import { newPublicity, NewPublicityData } from 'services/Publicity'
import styles from 'styles/form.module.css'

const { Title } = Typography
const { Option } = Select

const NewPublicity:React.FC = () => {
  const router = useRouter()
  const [ form ] = Form.useForm()

  const onFinish = async () => {
    const data = await form.validateFields()
    
    await newPublicity(data as NewPublicityData)
    router.push('/')
  }

  const onFailed = () => {
    alert('OPSIE')
    form.resetFields()
  }

  return (
    <AppLayout title="Publicar">
      <Title className={styles.title}>Publicar</Title>

      <Form
        form={form}
        className={styles.form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFailed}
      >
        <Form.Item 
          name="title"
          rules={[{ required: true }]}
        >
          <Input type="text" label="Título" />
        </Form.Item>
        
        <Form.Item 
          name="description"
          rules={[{ required: true }]}
        >
          <Input type="textarea" label="Descrição" />
        </Form.Item>
        
        <Form.Item 
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Selecione a categoria correspondente"
            size="large"
            allowClear
          >
            <Option value="Veículo">Veículo</Option>
            <Option value="Imóvel">Imóvel</Option>
            <Option value="Serviço">Serviço</Option>
            <Option value="Emprego">Emprego</Option>
            <Option value="Outros">Outros</Option>
          </Select>
        </Form.Item>
        
        <Form.Item 
          name="thumbnail"
          rules={[{ required: false }]}
          valuePropName="file"
          getValueFromEvent={e => e && e.file}
        >
          <Upload name="thumbnail">
            <Button>
              <UploadOutlined /> Selecione uma thumbnail
            </Button>
          </Upload>
        </Form.Item>
        
        <Form.Item
          name="gallery"
          rules={[{ required: false }]}
          valuePropName="fileList"
          getValueFromEvent={e => e && e.fileList}
        >
          <Upload name="gallery">
            <Button>
              <UploadOutlined /> Adicione imagens à galeria
            </Button>
          </Upload>
        </Form.Item>
        
        <Form.Item 
          name="whatsapp"
          rules={[{ required: true }]}
        >
          <Input type="text" label="Whatsapp" />
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.submit}
            type="primary" 
            htmlType="submit"
            size="large"
          >
            Publicar
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  )
}

export default NewPublicity