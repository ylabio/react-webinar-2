import React from 'react';
import './style.css'

const TotalPrice = ({totalPrice}) => {
  return (
    <div className='totalPrice'>
      <div className='totalPrice-text'>Итого</div>
      <div className='totalPrice-text'>{totalPrice.toLocaleString('ru-RU')} ₽</div>
    </div>
  );
};

export default TotalPrice;