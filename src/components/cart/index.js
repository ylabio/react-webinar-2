import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Total from '../total';
import './style.css';

function Cart({store, closePopup, children}) {
  const cn = bem('Cart');
  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h2 className={cn('title')}>Корзина</h2>
        <button className={cn('add-button')} onClick={closePopup}>
          Закрыть
        </button>
      </div>
      {children}
      {store.sumItemsInCart > 0 && <Total totalPrice={store.allPriceItemsInCart}/>}
    </div>
  )
}

Cart.propTypes = {
  store: propTypes.object.isRequired,
  closePopup: propTypes.func.isRequired,
  children: propTypes.node,
}

export default React.memo(Cart);
