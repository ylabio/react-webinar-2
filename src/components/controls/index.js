import React, {useState} from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import ModalBasket from '../modalBasket/modalBasket';
import BasketItem from '../item/basketItem'
import {getPriceFormatter, getBasketTotalPrice} from '../../utils';

function Controls(props){

  let renderBasketCount = () => {
    if (Object.keys(props.state.basket).length == 0) {
      return 'Пусто'
    } else {
      return `${Object.keys(props.state.basket).length} ${plural(Object.keys(props.state.basket).length, 'товар', 'товара', 'товаров')} / ${getPriceFormatter().format(getBasketTotalPrice(props.state))}`
    }
  }
  return (
    <div className='Controls'>
      <div className='order'>
        В корзине:
      </div>
      <div className='order'>
      {renderBasketCount()}
      </div>
      <div className=''>
        <button onClick={() => props.onOpenBasketClicked()}>Перейти</button>
      </div>
    </div>
  )
}
/*
Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}
*/
export default Controls;
