import { Input, Select, Upload, Form, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import ModalForm from 'components/ModalForm'

import api from 'services/api'
import layout from 'styles/layout.module.css'

const { Option } = Select

const NewPublicity:React.FC = () => {
  const [ form ] = Form.useForm()

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    const data = await form.validateFields()
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('thumbnail', data.thumbnail.originFileObj)
    formData.append('whatsapp', data.whatsapp)
    data.gallery && 
    data.gallery.forEach(obj => formData.append('gallery', obj.originFileObj))

    try {
      await api.post('/publicity', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalForm
      label="Anunciar"
      title="Anuncie"
      type="primary"
      handleSubmit={handleSubmit}
      className={layout.navbar_actions}
      closeAfterSubmit
      width="50vw"
    >
      <Form
        form={form}
        wrapperCol={{ span: 24, style: { margin: '0 auto' } }}
      >
        <Form.Item 
          name="title"
          rules={[{ required: true }]}
        >
          <Input type="text" placeholder="Título" />
        </Form.Item>
        <Form.Item 
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Descrição" rows={20} />
        </Form.Item>
        <Form.Item 
          name="category"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Selecione a categoria correspondente"
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
          <Input type="text" placeholder="Whatsapp" />
        </Form.Item>
      </Form>
    </ModalForm>
  )
}

export default NewPublicity