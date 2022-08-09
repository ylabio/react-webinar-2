import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import List from '../list/index';


function Basket (basket) {
  const callbacks = {
    addItemInBasket: useCallback(() => {
      props.addItemInBasket(props.item),[]
    })
  };
  return (
    <div className='Basket'>
      <div className='Basket-head'>
        <h1 className='Basket-title'>Магазин</h1>
        <button className='Basket-button'>Закрыть</button>
      <List items={basket.items} addItemInBasket={callbacks.addItemInBasket}></List>
      
      </div>
    </div>
  )
}

export default Basket;