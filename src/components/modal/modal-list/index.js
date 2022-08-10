import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { arrFromSet } from '../../../utils.js';
import './style.css';

// Список уникальных товаров отображаемых в модальном окне

function ModalList(props) {

  const cn = bem('Modal-list');

  return (
    <div className={cn()}>{arrFromSet(props.cartItems).map((item, index) =>
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
            {props.cartItems.filter(i => i.code === item.code).length} шт
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

ModalList.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func
}

ModalList.defaultProps = {
  onItemDelete: () => {}
}

export default React.memo(ModalList)