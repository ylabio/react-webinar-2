import React, { useState } from 'react';
import propTypes from 'prop-types';
import { formatPrice, priceReduce} from '../../utils';
import './style.css';
import plural from 'plural-ru';

function Controls(props){

  return (
    <div className='Controls'>
      <span>В корзине: <span>
      {props.chosenItems.length !== 0 
      ? <span> {props.chosenItems.length}  
        {plural(props.chosenItems.length, ' товар', ' товара', ' товаров')} / 
        {` ${formatPrice(priceReduce(props.chosenItems))}` }</span>  
      : 'пусто'}</span>
      </span>
      <button onClick={props.onToggle}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onToggle: propTypes.func.isRequired // Обязательное свойство - функция
}


Controls.defaultProps = {
  onToggle: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
