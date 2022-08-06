import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
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
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
}

Item.defaultProps = {
  onDeleted: () => {},
}

export default React.memo(Item)
