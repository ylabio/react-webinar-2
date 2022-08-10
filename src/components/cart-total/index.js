import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartTotal(props) {
  const cn = bem('Cart-total');

  return (
    <div className={cn()}>
      {props.totalCount 
      ? <>
          <b>Итого</b>
          <b>{props.totalPrice.toLocaleString('ru')} ₽</b>
        </>
      : <h2>В корзине ничего нет</h2>}
    </div>
  )
}

CartTotal.propTypes = {
  totalCount: propTypes.number.isRequired,
  totalPrice: propTypes.number
}

CartTotal.defaultProps = {
  totalPrice: 0
}

export default React.memo(CartTotal);