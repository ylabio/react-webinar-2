import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from '../../item'
import List from '../../list'
import {getFormattedPrice} from '../../../utils';
import './style.css'

function CartModal(props) {
  const cn = bem('CartModal');

  if (props.cart.itemsQuantity === 0) {
    return <div className={cn("empty")}>Корзина пуста</div>
  }

  return (
    <>
      <List items={props.cart.items} 
            renderItem={(item) => (
              <Item key={item.code} 
                    item={item} 
                    buttonText={"Удалить"}
                    onButtonClick={props.onDelete}
              />
            )}
        />
        <div className={cn('total')}>
          Итого: <span className={cn('totalPrice')}>{getFormattedPrice(props.cart.totalPrice)}</span>
        </div>
      </>
  )
}

export default CartModal

CartModal.propTypes = {
  cart: propTypes.shape({
    items: propTypes.arrayOf(propTypes.object).isRequired,
    itemsQuantity: propTypes.number.isRequired,
    totalPrice: propTypes.number.isRequired
  }),
  onDelete: propTypes.func.isRequired
}