import React from 'react';
import cls from './../../modal.module.css'
import { propTypes } from 'prop-types';

export const TotalCountCart = ({totalPrice}) => {
  return (
    <div className={cls.totalPriceContainer}>
        <b>
          Итого
        </b>
        <b>
          {totalPrice.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </b>
      </div>
  );
}

