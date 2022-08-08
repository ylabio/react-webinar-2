import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    addItem: useCallback(
      (e) => {
        console.log(props.item)
        e.stopPropagation()
        props.addItem(props.item)
      },
      [props.addItem, props.item]
    ),
    onDelete: useCallback(
      (e) => {
        e.stopPropagation()
        props.onDelete(props.item.code)
      },
      [props.onDelete, props.item]
    ),
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>
        {props.item.price}
        <span> &#8381;</span>{' '}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.addItem}>Добавить</button>
        {/* <button onClick={callbacks.onDelete}>Удалить</button> */}
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  // onDeleted: propTypes.func.isRequired,
  addItem: propTypes.func.isRequired,
}

Item.defaultProps = {
  // onDeleted: () => {},
  addItem: () => {},
}

export default React.memo(Item)
