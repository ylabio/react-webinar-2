import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

function Navbar() {
  const bem = cn('Navbar')

  return (
  <div className={bem()}>
    <Link to='/' replace={true}>Главная</Link>
  </div>  
  )
}

export default React.memo(Navbar)