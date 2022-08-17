import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import Controls from '../controls'

function ModalItem(props) {
  const cn = bem('ModalItem')

  const price = props.item.price.toLocaleString()

  const callbacks = {
    clickBtn: useCallback((e) => {
      e.stopPropagation()
      props.clickBtn(props.item)
    }, []),
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code + ' '}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{price + ' ₽'}</div>
      <div className={cn('count')}>
        {props.itemCount}
        <span> шт.</span>
      </div>
      <div className={cn('actions')}>
        <Controls title={props.titleBtn} clickHandler={callbacks.clickBtn} />
      </div>
    </div>
  )
}

ModalItem.propTypes = {
  item: propTypes.object.isRequired,
  itemCount: propTypes.number,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

export default React.memo(ModalItem)
