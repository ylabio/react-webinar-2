import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React from 'react'
import './style.css'

function List({ items, itemTemplate }) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {items.map(itemProps => (
        <div className={cn('item')} key={itemProps.item.code}>
          {React.createElement(itemTemplate, { ...itemProps })}
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  itemTemplate: propTypes.elementType,
  items: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(List)
