import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import Item from '../item'
import './style.css'

function List(props) {
  const cn = bem('List')

  return (
    <div className={cn()}>
      {/* <h1>{props.items.length && props.items[0].count}</h1> */}
      {props.items.map((item) => {
        console.log(item.count)
        return (
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              titleBtn={props.titleBtn}
              clickBtn={props.clickBtn}
              // onDelete={props.onItemDelete}
              // addItem={props.addItem}
              // deleteItem={props.deleteItem}
              itemCount={item.count}
              arrName={props.arrName}
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
  // deleteItem: propTypes.func,
  // addItem: propTypes.func,
  arrName: propTypes.string,
}

List.defaultProps = {
  // items: [],
  onItemDelete: () => {},
  addItem: () => {},
}

export default React.memo(List)
