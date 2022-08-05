import React from 'react';
import plural from "plural-ru";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {numberFormat, sumProducts} from "src/utils";

function Controls({onAdd, cart, items}) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <p className={cn('description')}>В корзине: </p>
      <p className={cn('product')}>
        {cart.length ? ` ${cart.length} ${plural(cart.length, 'товар', 'товара', 'товаров')}` : 'пусто'}
        {cart.length ? ` / ${numberFormat(sumProducts(cart, items))}` : null}
      </p>
      <button className={cn('button')} onClick={onAdd}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
}

export default React.memo(Controls);
