import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { numberForm } from '../../utils';

// отображает количество / итоговую сумму товаров, количество опциональное (noCount)
const CartTotal = ({ title, price, count, noCount, className }) => {
  const pluralize = (n) => {
    const word =
      (n % 100 === 11 || n % 100 === 12 || n % 100 === 13 || n % 100 === 14) ? 'товаров'
        : (n % 10 === 1) ? 'товар'
          : (n % 10 === 2 || n % 10 === 3 || n % 10 === 4) ? 'товара'
            : 'товаров';
    return n + ' ' + word;
  };

  return (
    <div className={'cart-total ' + className}>
      <b>{ title }</b>
      {noCount
        ? <b>{count > 0 ? `${numberForm(price)} ₽` : 'пусто'}</b>
        : <b>{count > 0 ? `${pluralize(count)} / ${numberForm(price)} ₽` : 'пусто'}</b> }
    </div>
  )
};

CartTotal.propTypes = {
  title: propTypes.string,
  price: propTypes.number,
  count: propTypes.number,
  noCount: propTypes.bool,
  className: propTypes.string
};

CartTotal.defaultProps = {
  title: 'Итого:',
  price: -1,
  count: -1,
  noCount: false
};

export default React.memo(CartTotal);