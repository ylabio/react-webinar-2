import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import { currencyFormat } from '../../utils';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';

function Controls({cart: {totalPrice, totalQuantity}, onPopupOpen}){
  const cn = bem('Controls');
  const modifiedCurrency = currencyFormat(totalPrice, 0);

   return (
    <div className='Controls'>
      <div className={cn('wrapper')}><p className={cn('text')}>В корзине:</p><b>{totalQuantity ? `${totalQuantity} ${plural(totalQuantity, 'товар', 'товара', 'товаров')}` : 0} / {modifiedCurrency}</b></div>
      <button className={cn('actions')} onClick={onPopupOpen}>Перейти</button>
    </div>
  )
}


Controls.propTypes = {
  cart:  propTypes.object.isRequired,
  onPopupOpen: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onPopupOpen: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
