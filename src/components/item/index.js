import React, { useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

const Item = (props) => {
  const [price, setPrice] = useState(props.item.currentPrice)
  const cn = bem('Item')

  useEffect(() => {
    setPrice(props.item.currentPrice)
  }, [props.item.currentPrice])

  const callbacks = {
    usingFunc: useCallback(
      (e) => {
        e.stopPropagation()
        props.usingFunc(props.item.code)
      },
      [props.item]
    )
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{`${props.item.currentPrice ? price : props.item.price} ₽`}</div>
      {props.item.quantity && <div className={cn('quantity')}>{`${props.item.quantity} шт`}</div>}
      <div className={cn('actions')}>
        <button onClick={callbacks.usingFunc}>{props.action}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  usingFunc: propTypes.func.isRequired,
  action: propTypes.string.isRequired
}

Item.defaultProps = {
  usingFunc: () => {}
}

export default React.memo(Item)
