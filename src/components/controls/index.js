import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({openModal, basketInfo}){
  // console.log('controls')
  // console.log(basketInfo.itemsOfBasket)
  const basketInfoText = basketInfo.items.length === 0 ? 'пусто' : `${basketInfo.items.length} товара / ${basketInfo.totalOfBasket} ₽`;
  return (
    <div className='Controls'>
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
