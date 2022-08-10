import './style.css';

import React from 'react'

function CartSum({ sum }) {
  return (
    <div className='Cart-sum'>Итого <span>{sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}</span></div>
  )
}

export default React.memo(CartSum)
