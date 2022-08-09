import React, { useCallback } from "react";
import BasketTotal from "../basket-total";
import ItemBasket from "../item-basket";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import './style.css';

function Basket({children, basket, totalPrice, deleteItem, numUniqueItems}) {
  const cn = bem('Basket');
  
  const renders = {
    itemBasket: useCallback((itemBasket) => {
      return <ItemBasket item={itemBasket}
                         deleteItem={deleteItem}
             />
    }, [deleteItem])
  }

  return (     
    <div className={cn()}>
      {children}
        <List items={basket}
              itemForRender={renders.itemBasket}
        />
        <BasketTotal totalPrice={totalPrice}
                     numUniqueItems={numUniqueItems}
        />
    </div>
  )
}

Basket.propTypes = {
  children: propTypes.node,
  basket: propTypes.array.isRequired,
  totalPrice: propTypes.number.isRequired,
  numUniqueItems: propTypes.number.isRequired,
  deleteItem: propTypes.func.isRequired
}

export default React.memo(Basket);
