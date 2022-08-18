import { cn } from '@bem-react/classname'
import propTypes from 'prop-types'
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

Header.propTypes = {
  basketControls: propTypes.object.isRequired,
  translate: propTypes.object
}
Header.defaultProps = {
  // Не требуется, так как у всех прокинутых компонентов есть свои дефолтные пропсы
}

export default React.memo(Header)