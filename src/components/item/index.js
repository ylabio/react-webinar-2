import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import Controls from '../controls'

function Item(props) {
  const cn = bem('Item')

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
      <div className={cn('price')}>{props.item.price + ' ₽'}</div>
      {props.item.count && (
        <div className={cn('count')}>
          {props.itemCount}
          <span> шт.</span>{' '}
        </div>
      )}
      <div className={cn('actions')}>
        <Controls title={props.titleBtn} clickHandler={callbacks.clickBtn} />
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemCount: propTypes.number,
  arrName: propTypes.string,
}

export default React.memo(Item)
