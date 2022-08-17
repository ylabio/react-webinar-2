import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

function Navbar({translate: {toMain}}) {
  const bem = cn('Navbar')

  return (
  <div className={bem()}>
    <Link to='/' replace={true}>{toMain}</Link>
  </div>  
  )
}

export default React.memo(Navbar)