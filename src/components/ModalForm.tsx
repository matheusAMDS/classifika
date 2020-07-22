import { Button, Modal } from 'antd'
import { useState } from 'react'

type ButtonType 
  = "text" 
  | "link" 
  | "ghost" 
  | "primary" 
  | "default" 
  | "dashed"

interface Props {
  type?: ButtonType;
  title: string;
  label: string;
  className?: string;
  handleSubmit: () => Promise<void>;
  closeAfterSubmit?: boolean;
  width?: string;
}

const ModalForm:React.FC<Props> = ({ 
  children, 
  title, 
  type, 
  label, 
  handleSubmit, 
  className, 
  closeAfterSubmit ,
  width
}) => {
  const [ visible, setVisible ] = useState(false)

  return (
    <>
      <Button 
        type={type} 
        onClick={() => setVisible(true)} 
        className={className}
      >
        {label}
      </Button>
      <Modal 
        visible={visible}
        title={title}
        onCancel={() => setVisible(false)}
        okText={label}
        cancelText="Cancelar"
        destroyOnClose
        onOk={async () => {
          await handleSubmit()
          if (closeAfterSubmit)
            setVisible(false)
        }}
        width={width}
      >
        { visible ? children : null}
      </Modal>
    </>
  )
}

export default ModalForm