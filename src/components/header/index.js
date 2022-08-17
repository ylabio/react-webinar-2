import { cn } from '@bem-react/classname'
import React from 'react'
import BasketSimple from '../basket-simple'
import Navbar from '../navbar'
import './styles.css'

function Header({
  basketControls: {
    sum, amount, onOpen
  },
  translate
}) {
  const bem = cn('Header')
  return (
    <div className={bem()}>
      <Navbar translate={translate.nav}/>
      <BasketSimple sum={sum} amount={amount} onOpen={onOpen} translate={translate.basketSimple} />
    </div>
  )
}

export default React.memo(Header)