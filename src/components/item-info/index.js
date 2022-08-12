import { cn } from '@bem-react/classname'
import propTypes from 'prop-types'
import React from 'react'
import './styles.css'

function ItemInfo({
  item: {
    description,
    country,
    category,
    edition,
    price
  },
  onAdd
}) {
  const bem = cn('ItemInfo')

  return (
    <div className={bem()}>
      <div>{description}</div>
      <div>Страна производитель: <span>{country}</span></div>
      <div>Категория: <span>{category}</span></div>
      <div>Год выпуска: <span>{edition}</span></div>
      <h2>Цена: {price}</h2>
      <button onClick={onAdd}>Добавить</button>
    </div>
  )
}

ItemInfo.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ItemInfo.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ItemInfo)