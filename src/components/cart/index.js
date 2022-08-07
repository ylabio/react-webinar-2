import {cn as bem} from '@bem-react/classname';
import React from 'react';
import propTypes from 'prop-types';
import List from 'src/components/list';
import './style.css'

function Cart(props) {
  const cn = bem('Cart');

  if (props.items.length === 0) {
    return (
      <div className={cn()}>
        <p className={cn('empty')}>Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Корзина</h2>
      <List items={props.items}
            onButton={props.onDeleteToCartItem}
            titleButton="Удалить"/>
      <div className={cn('total')}>
        <p>Итого</p> <p>{props.total}</p>
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.string,
  onDeleteToCartItem: propTypes.func.isRequired,
}

export default React.memo(Cart);