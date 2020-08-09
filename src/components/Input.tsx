import { Input } from 'antd'
import { ReactNode } from 'react'

import styles from 'styles/input.module.css'

interface Props {
  type: string;
  label: string;
  icon?: ReactNode; 
}

const CustomInput: React.FC<Props> = ({ type, label, icon, ...rest }) => {
  if (type === 'password')
    return (
      <Input.Password 
        size="large"
        className={styles.input}
        placeholder={label}
        prefix={icon}
        { ...rest }
      />
    )
  
  else if (type === 'textarea')
    return (
      <Input.TextArea
        className={styles.input}
        placeholder={label}
        rows={15}
        { ...rest }
      />
    )
  
  else
    return (
      <Input 
        size="large"
        className={styles.input}
        placeholder={label}
        prefix={icon}
        { ...rest }
      />
    )
}

export default CustomInput