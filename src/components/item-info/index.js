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
  onAdd,
  translate
}) {
  const bem = cn('ItemInfo')

  return (
    <div className={bem()}>
      <div>{description}</div>
      <div>{translate.country}<span>{country}</span></div>
      <div>{translate.category}<span>{category}</span></div>
      <div>{translate.edition}<span>{edition}</span></div>
      <h2>{translate.price}{price}</h2>
      <button onClick={onAdd}>{translate.add}</button>
    </div>
  )
}

ItemInfo.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  translate: propTypes.object
}

ItemInfo.defaultProps = {
  onAdd: () => {},
  translate: {
    country: 'text',
    category: 'text',
    edition: 'text',
    price: 'text',
    add: 'text',
  }
}

export default React.memo(ItemInfo)