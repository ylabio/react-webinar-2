import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem({item, number, buttonAction}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {number}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price.toLocaleString("ru-RU")} ₽
      </div>
      <div className={cn('count')}>
        {item.count} шт
      </div>
      <div className={cn('actions')}>
          <button onClick={() => buttonAction(item)}>
            Удалить
          </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object,
  number: propTypes.number,
  buttonAction: propTypes.func.isRequired
}

CartItem.defaultProps = {
  item: {}
}

export default React.memo(CartItem);
