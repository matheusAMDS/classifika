import { Modal, Button } from 'antd'
import { useState } from 'react'

interface Props {
  type: "text" | "link" | "ghost" | "primary";
  onOk: () => void;
  buttonLabel: string;
  title?: string;
  onOkLabel?: string;
  onCancelLabel?: string;
}

const ModalButton: React.FC<Props> = ({ 
  children, 
  type, 
  onOk, 
  buttonLabel,
  title,
  onOkLabel,
  onCancelLabel
}) => {
  const [ visible, setVisible ] = useState(false)

  return (
    <div>
      <Button type={type} onClick={() => setVisible(true)} style={{ padding: 0 }}>
        {buttonLabel}
      </Button>
      <Modal
        visible={visible}
        onOk={onOk}
        onCancel={() => setVisible(false)}
        title={title}
        okText={onOkLabel}
        cancelText={onCancelLabel || "Cancelar"}
        closable
      >
        {children}
      </Modal>
    </div>
  )
}

export default ModalButton