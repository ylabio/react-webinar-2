import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'

function Loader() {
  const bem = cn('Loader')
  return (
    <div className={bem()}>
      <div className={bem('spinner')}>Loading...</div>
      <div className={bem('text')}>Идёт загрузка. Пожалуйста, подождите</div>
    </div>
  )
}

export default Loader