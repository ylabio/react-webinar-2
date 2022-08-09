import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({openBasket}){
  return (
      <div className='Controls'>
        <div className='Controls-title'>В корзине:</div>
        <div className='Controls-info'>пусто</div>
        <button onClick={openBasket}>Перейти</button>
      </div>
  )
}

Controls.propTypes = {
  openBasket: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  openBasket: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
