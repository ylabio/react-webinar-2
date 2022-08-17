import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import { Link } from 'react-router-dom'
import './style.css'
import numberFormat from '../../utils/numberFormat'

function Item(props) {
  const cn = bem('Item')

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
  }

  return (
    <div className={cn()}>
      <Link to={`${props.path}${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  path: propTypes.string,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item)
