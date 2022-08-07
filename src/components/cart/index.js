import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';

function Cart({amount, total}) {
  const title = 'В корзине: '
  return (
    <span>
      {title}
      <strong>
        {`${plural(amount, '%d товар', '%d товара', '%d товаров')} / ${total} ₽`}
      </strong>
    </span>
  )
}

Cart.propTypes = {
  amount: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
}

Cart.defaultProps = {
  amount: 0,
  total: 0,
}

export default React.memo(Cart);
