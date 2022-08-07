import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getPriceOnRub, getAllPrice} from '../../utils';
import './style.css';

function Cart({items, isVisible, closePopup, children}) {
  const cn = bem('Cart');
  return (
    <div className={isVisible ? cn({visible: true}) : cn()}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('add-button')} onClick={closePopup}>
            Закрыть
          </button>
        </div>
        {children}
        {items.length > 0 &&
          <p className={cn('total')}>
            Итого
            <span className={cn('price')}>
            {getPriceOnRub(getAllPrice(items))}
            </span>
          </p>
        }
      </div>
    </div>
  )
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isVisible: propTypes.bool.isRequired,
  closePopup: propTypes.func.isRequired,
}

Cart.defaultProps = {
  items: [],
  isVisible: false,
  closePopup: () => {},
}

export default React.memo(Cart);
