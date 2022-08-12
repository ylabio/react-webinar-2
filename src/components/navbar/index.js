import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import BasketSimple from '../basket-simple'

function Navbar({
  sum, amount, onOpen
}) {
  const bem = cn('Navbar')

  return (
  <div className={bem()}>
    <Link to='/' replace={true}>Главная</Link>
    <BasketSimple sum={sum} amount={amount} onOpen={onOpen}/>
  </div>  
  )
}

export default React.memo(Navbar)