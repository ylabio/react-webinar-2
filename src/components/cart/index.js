import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Cart({amount, total, title}) {
  const cn = bem('Cart');
  return (
    <span className={cn()}>
      <span>{title}</span>
      <strong>
        {amount
          ? `${plural(amount, '%d товар', '%d товара', '%d товаров')} / ${total} ₽`
          : 'Пусто'
        }
      </strong>
    </span>
  )
}

Cart.propTypes = {
  amount: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  title: propTypes.string
}

Cart.defaultProps = {
  amount: 0,
  total: 0,
  title: 'В корзине:'
}

export default React.memo(Cart);
