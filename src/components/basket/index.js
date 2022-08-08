import React from "react";
import BasketTotal from "../basket-total";
import ItemBasket from "../item-basket";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Basket({children, basket, totalPrice, deleteItem}){
  const cn = bem('Basket');

  return (     
    <div className={cn()}>
      {children}
      {basket.map((item) => (
        <div className={cn('item-basket')} key={item.code} >
          <ItemBasket item={item}
                      deleteItem={deleteItem}
          />
        </div>
          ))}
        <BasketTotal totalPrice={totalPrice}
                     basket={basket}
        />
    </div>
  )
}

Basket.propTypes = {
  children: propTypes.node,
  basket: propTypes.array.isRequired,
  totalPrice: propTypes.number.isRequired,
  deleteItem: propTypes.func.isRequired
}

Basket.defaultProps = {
  basket: [],
  totalPrice: 0,
  deleteItem: () => {}
}

export default Basket;
