import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { currencyFormat } from '../../utils';

function Controls({onAdd, cart: {totalPrice, totalQuantity}}){
  const modifiedCurrency = currencyFormat(totalPrice, 0);

   return (
    <div className='Controls'>
      <p>В корзине: {totalQuantity} товара / {modifiedCurrency}</p>
      <button onClick={onAdd}>Перейти</button>
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
