import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import plural from 'plural-ru'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item.code)
      if (!props.item.selected) {
        setCount(count + 1)
      }
    }, [props.onSelect, props.item, setCount, count]),

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
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item)
