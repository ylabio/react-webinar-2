import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import store from '../../../index.js';
import { arrFromSet } from '../../../utils.js';
import './style.css';

// Список уникальных товаров отображаемых в модальном окне

function CartList(props) {

  const cn = bem('Cart-list');

  return (
    <div className={cn()}>{arrFromSet(props.items).map((item, index) =>
      <div key={index} className={cn('child')}>
        <div className={cn('item')}>
          <div className={cn('item-number')}>
            {item.code}
          </div>
          <div className={cn('item-title')}>
              {item.title}
          </div>
          <div className={cn('item-price')}>
            {item.price.toLocaleString('ru-RU')} ₽
          </div>
          <div className={cn('item-count')}>
            {store.getState().cartItems.filter(i => i.code === item.code).length} шт
          </div>
          <div className={cn('item-actions')}>
            <button onClick={() => props.onItemDelete(item.code)}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )

}

CartList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func.isRequired
}

CartList.defaultProps = {
  items: [],
  onItemDelete: () => {},
}

export default React.memo(CartList)