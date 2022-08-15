import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import numberFormat from '../../utils/numberFormat'

function ProductInfo(props) {
  const cn = bem('ProductInfo')

  const maidIn = { ...props.item.maidIn }
  const category = { ...props.item.category }

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>Описание товара: {props.item.description}</div>
      <div className={cn('country')}>
        Cтрана производитель:{' '}
        <span>
          {maidIn.title} ({maidIn.code})
        </span>
      </div>
      <div className={cn('category')}>
        Категория: <span>{category.title}</span>
      </div>
      <div className={cn('edition')}>
        Год выпуска: <span>{props.item.edition}</span>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(props.item.price)}</div>
      <button className={cn('btn')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  )
}

ProductInfo.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ProductInfo.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ProductInfo)
