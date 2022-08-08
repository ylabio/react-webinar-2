import React, {useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import plural from 'plural-ru';
import {getFormattedPrice} from '../../utils';

function Controls(props){
  const cn = bem('Controls');
  const products = props.cartItems;

  const callbacks = {
    onCartOpen: useCallback(() => {
      props.onCartOpen();
    }, [])
  };

  return (
    <div className='Controls'>
      <div className={cn('title')}>
        В корзине:
      </div>
      <div className={cn('info')}>
        <b>
          {
            products.length > 0 ?
            `${products.length} 
            ${plural(products.length, 'товар', 'товара', 'товаров')} / 
            ${getFormattedPrice(props.totalPrice)}` :
            'пусто'
          }
        </b>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onCartOpen}>
          Перейти
        </button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cartItems: propTypes.array.isRequired,
  totalPrice: propTypes.number.isRequired,
  onCartOpen: propTypes.func.isRequired // Обязательное свойство - функция
}

export default React.memo(Controls);
