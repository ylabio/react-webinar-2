import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";
import prettyMoney from 'pretty-money';
import './style.css';

function Cart({amount, total, title}) {
  const cn = bem('Cart');
  const data = {
    amount: plural(amount, '%d товар', '%d товара', '%d товаров'),
    total: prettyMoney({currency: '₽', thousandsDelimiter: ' '}, total)
  }
  return (
    <span className={cn()}>
      <span>{title}</span>
      <strong>
        {amount
          ? `${data.amount} / ${data.total}`
          : 'Пусто'
        }
      </strong>
    </span>
  )
}

Cart.propTypes = {
  amount: propTypes.number,
  total: propTypes.number,
  title: propTypes.string
}

Cart.defaultProps = {
  amount: 0,
  total: 0,
  title: 'В корзине:'
}

export default React.memo(Cart);
