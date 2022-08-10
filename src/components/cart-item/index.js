import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React, { useCallback } from 'react'
import { formatRubPrice } from '../../utils'
import './style.css'

function CartItem(props) {
  const cn = bem('Item')

  const callbacks = {
    onDelete: useCallback(
      e => {
        props.onDelete(props.item.code)
      },
      [props.onDelete, props.item]
    )
  }

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>
        {formatRubPrice(props.item.price)}
      </div>

      <div className={cn('count')}>{props.item.count + ' шт'}</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func
}

export default React.memo(CartItem)
