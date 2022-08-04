import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function TotalPrice(props) {
  const cn = bem('TotalPrice');
  return (
    <div className={cn()}>
      <strong>Итого</strong>
      <strong>{props.price + ' ₽'}</strong>
    </div>
  );
}

TotalPrice.propTypes = {
  price: propTypes.number
};

export default React.memo(TotalPrice);
