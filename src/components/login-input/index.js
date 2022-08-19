import React, { useCallback } from 'react'
import Input from '../input'
import './styles.css'

function LoginInput({
  title,
  value,
  onChange,
  onFocus,
  type
}) {
  const callbacks = {
    onChangeFn: useCallback((v) => onChange(v), [onChange]),
    onFocus: useCallback((v) => onFocus(v), [onFocus])
  }
  return (
    <div className='LoginInput'>
      <div className='LoginInput-title'>{title}</div>
      <Input 
        value={value}
        onChange={callbacks.onChangeFn}
        onFocus={callbacks.onFocus}
        notThrottle={true}
        type={type}
      />
    </div>
  )
}

export default LoginInput