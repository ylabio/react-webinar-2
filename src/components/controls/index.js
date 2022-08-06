import plural from 'plural-ru'
import propTypes from 'prop-types'
import React from 'react'
import { formatRubPrice } from '../../utils'
import './style.css'

function Controls({ onCartOpen, cart }) {
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <strong>
        {cart.count === 0
          ? 'Пусто'
          : `${cart.count} ${plural(
              cart.count,
              'товар',
              'товара',
              'товаров'
            )} / ${formatRubPrice(cart.price)}`}
      </strong>
      <button onClick={onCartOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onCartOpen: propTypes.func.isRequired,
  cart: propTypes.object.isRequired
}

export default React.memo(Controls)
