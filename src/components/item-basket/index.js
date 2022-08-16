import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import numberFormat from '../../utils/numberFormat'
import { cn as bem } from '@bem-react/classname'
import './styles.css'

function ItemBasket(props) {
  const cn = bem('ItemBasket')

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
    closeModal: useCallback((e) => props.closeModal(), []),
  }

  return (
    <div className={cn()}>
      <Link onClick={callbacks.closeModal} to={`product/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
}

ItemBasket.defaultProps = {}

export default React.memo(ItemBasket)
