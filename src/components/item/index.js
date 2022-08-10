import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import Controls from '../controls'

function Item(props) {
  const cn = bem('Item')

  const price = props.item.price.toLocaleString()

  const callbacks = {
    clickBtn: useCallback((e) => {
      e.stopPropagation()
      props.clickBtn(props.item.code)
    }, []),
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code + ' '}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{price + ' ₽'}</div>
      <div className={cn('actions')}>
        <Controls title={props.titleBtn} clickHandler={callbacks.clickBtn} />
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

export default React.memo(Item)
