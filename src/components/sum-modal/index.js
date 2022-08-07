import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

const SumModal = ({ sumInCart }) => {
  const cn = bem('Sum');

  return (
    <div className={cn()}>
      <div>Итого</div>
      <div>{sumInCart.toLocaleString('ru-RU')} ₽</div>
    </div>
  );
};

SumModal.propTypes = {
  sumInCart: propTypes.number,
};

SumModal.defaultProps = {};

export default memo(SumModal);
