import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import Item from '../item'
import './style.css'

function List(props) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {props.items.map((item) => {
        return (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              titleBtn={props.titleBtn}
              clickBtn={props.clickBtn}
              itemCount={item.count}
            />
          </div>
        )
      })}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

List.defaultProps = {
  items: [],
  onItemDelete: () => {},
  addItem: () => {},
}

export default React.memo(List)
