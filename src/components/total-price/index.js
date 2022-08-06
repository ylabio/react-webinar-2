import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React from 'react'
import { formatRubPrice } from '../../utils'
import './style.css'

function TotalPrice(props) {
  const cn = bem('TotalPrice')
  return (
    <div className={cn()}>
      <strong>Итого</strong>
      <strong>{formatRubPrice(props.price)}</strong>
    </div>
  )
}

TotalPrice.propTypes = {
  price: propTypes.number.isRequired
}

export default React.memo(TotalPrice)
