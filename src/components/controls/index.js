import React from 'react';
import propTypes from 'prop-types';
import { priceReduce, counterReduce } from '../../utils';
import './style.css';
import plural from 'plural-ru';

function Controls(props){
  return (
    <div className='Controls'>
      <span>В корзине: <span>
      {counterReduce(props.chosenItems) !== 0 
      ? <span> {counterReduce(props.chosenItems)}  
        {plural(counterReduce(props.chosenItems), ' товар', ' товара', ' товаров')} / 
        {` ${priceReduce(props.chosenItems)}`} &#8381;</span>  
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
