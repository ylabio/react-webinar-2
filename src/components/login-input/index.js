import React, { useCallback } from 'react'
import Input from '../input'
import './styles.css'

function LoginInput({
  title,
  value,
  onChange,
  type
}) {
  const callbacks = {
    onChangeFn: useCallback((v) => onChange(v), [onChange])
  }
  return (
    <div className='LoginInput'>
      <div className='LoginInput-title'>{title}</div>
      <Input 
        value={value}
        onChange={callbacks.onChangeFn}
        notThrottle={true}
        type={type}
      />
    </div>
  )
}

export default LoginInput