import { cn } from '@bem-react/classname'
import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import BasketSimple from '../basket-simple'
import propTypes from 'prop-types'

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

Navbar.propTypes = {
  sum: propTypes.number,
  amount: propTypes.number,
  onOpen: propTypes.func
}

Navbar.defaultProps = {
  sum: 0,
  amount: 0,
  onOpen: () => {},
}

export default React.memo(Navbar)