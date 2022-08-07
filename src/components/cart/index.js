import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from '../list';
import Spacing from '../spacing';

function Cart({items, onDeleteCart, cartSum}){
  const cn = bem('Cart');
  const ct = bem('Total');
  return (
    <div className={cn()}>
      <Spacing height={76} />
      {items.length > 0 ? <>
          <List mode='cart' items={items} onDeleteCart={onDeleteCart} />
          <div className={ct()}>
            <div className={ct('action')}>Итого</div>
            <div className={ct('action')}>{cartSum.toLocaleString('ru-RU') + ' ₽'}</div>
            <Spacing width={96} />
          </div>
        </> : 
        <div className={cn('label')}>
          В корзине пусто
        </div>}
    </div>
  )
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cartSum: propTypes.number,
  onDeleteCart: propTypes.func
}

Cart.defaultProps = {
  items: [],
  cartSum: 0,
  onDeleteCart: () => {},
}

export default React.memo(Cart);
