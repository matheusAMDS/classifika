import { Input } from 'antd'
import { ReactNode, Dispatch, SetStateAction } from 'react'

import styles from 'styles/input.module.css'

interface Props {
  type: string;
  label: string;
  icon?: ReactNode; 
  onChange?: Dispatch<SetStateAction<string>>;
}

const CustomInput: React.FC<Props> = ({ type, label, icon, onChange }) => {
  if (type === 'password')
    return (
      <Input.Password 
        size="large"
        className={styles.input}
        placeholder={label}
        prefix={icon}
        onChange={e => onChange(e.target.value)}
      />
    )
  
  else if (type === 'textarea')
    return (
      <Input.TextArea
        className={styles.input}
        placeholder={label}
        rows={15}
        onChange={e => onChange(e.target.value)}
      />
    )
  
  else
    return (
      <Input 
        size="large"
        className={styles.input}
        placeholder={label}
        prefix={icon}
        onChange={e => onChange(e.target.value)}
      />
    )
}

export default CustomInput