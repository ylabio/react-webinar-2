import { cn as bem } from '@bem-react/classname'
import propTypes from 'prop-types'
import React from 'react'
import './style.css'

function List({ items, render }) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {items.map(itemProps => (
        <div className={cn('item')} key={itemProps.item.code}>
          {render(itemProps)}
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  render: propTypes.func,
  items: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(List)
