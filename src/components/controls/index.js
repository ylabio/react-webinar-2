import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import { currencyFormat } from '../../utils';
import plural from 'plural-ru';

function Controls({cart: {totalPrice, totalQuantity}, onPopupOpen}){
  const modifiedCurrency = currencyFormat(totalPrice, 0);


   return (
    <div className='Controls'>
      <p>В корзине: {totalQuantity ? `${totalQuantity} ${plural(totalQuantity, 'товаров', 'товара', 'товар')}` : null} / {modifiedCurrency}</p>
      <button onClick={onPopupOpen}>Перейти</button>
    </div>
  )
}


Controls.propTypes = {
  onPopupOpen: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onPopupOpen: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
