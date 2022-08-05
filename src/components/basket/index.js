import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Basket({onOpenModal}){
  return (
    <div className='Basket'>
      <span className='Basket-text'>В корзине:</span>
      <span className='Basket-count'>3 товара / 243 ₽ </span>
      <button className='Basket-button' onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Basket.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Basket.defaultProps = {
  onOpenModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Basket);
