import React from 'react';
import propTypes from 'prop-types';
import './style.css';
const plural = require('plural-ru');
  
function Controls({openModal, basketInfo}){
  console.log(basketInfo.items.length)
  const basketInfoText = basketInfo.items.length === 0 ? 'пусто' : `${basketInfo.items.length} 
    ${plural( basketInfo.items.length, 'товар', 'товара','товаров')} / ${basketInfo.totalOfBasket.toLocaleString('ru-RU', {currency: 'RUB',style: 'currency',minimumFractionDigits: '0'})}`;
  return (
  <div className='Controls' style={{boederBottom: '1px dashed white'}}>
      <div className='Controls-content'>
        <p className='Controls-info'>В корзине: <span className='Controls-info-bold'>{basketInfoText}</span></p>
      </div>
      <button className="Controls-button" onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}


export default React.memo(Controls);
