import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'

function Loader({translate:{text}}) {
  const bem = cn('Loader')
  return (
    <div className={bem()}>
      <div className={bem('spinner')}>Loading...</div>
      <div className={bem('text')}>{text}</div>
    </div>
  )
}

export default Loader