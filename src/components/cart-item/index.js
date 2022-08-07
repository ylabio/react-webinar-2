import React from "react";
import Button from "../../shared/ui/button";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { formatPrice } from "../../shared/utils";
import propTypes from 'prop-types';

function CartItem ({item, removeItemFromCart}) {
  const cn = bem('CartItem');
  console.log(item)

  return <li className={cn()}>
    <div className={cn('blockLeft')}>
      <span>{item.data.code}</span>
      <span>{item.data.title}</span>
    </div>

    <div className={cn('blockRight')}>
      <span className={cn('price')}>
        {formatPrice(item.data.price) + ' ₽'}
      </span>
      <span className={cn('quantity')}>{item.quantity} шт</span>
      <Button 
        text='Удалить'
        onClick={() => removeItemFromCart(item)}
      />
    </div>
  </li>;
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  removeItemFromCart: propTypes.func.isRequired,
};

CartItem.defaultProps = {
  removeItemFromCart: () => {},
};

export default React.memo(CartItem);