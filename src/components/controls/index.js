import React from 'react';
import propTypes from 'prop-types';
import { formatPrice} from '../../utils';
import './style.css';
import plural from 'plural-ru';

function Controls(props){

  return (
    <div className='Controls'>
      <span>В корзине: <span>
      {props.amount 
      ? <span> {props.amount}  
        {plural(props.amount, ' товар', ' товара', ' товаров')} / 
        {` ${formatPrice(props.sum)}`}</span>  
      : 'пусто'}</span>
      </span>
      <button onClick={props.onToggle}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onToggle: propTypes.func.isRequired, // Обязательное свойство - функция
  sum: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
}


Controls.defaultProps = {
  onToggle: () => {}, // Значение по умолчанию - функция-заглушка
  sum: 0,
  amount: 0
}

export default React.memo(Controls);
