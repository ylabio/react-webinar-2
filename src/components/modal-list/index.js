import React from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'
import ModalItem from '../modal-item'

function ModalList(props) {
  const cn = bem('ModalList')

  return (
    <div className={cn()}>
      {props.items.map((item) => {
        return (
          <div key={item.code} className={cn('item')}>
            <ModalItem
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

ModalList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

ModalList.defaultProps = {
  items: [],
  onItemDelete: () => {},
  addItem: () => {},
}

export default React.memo(ModalList)
