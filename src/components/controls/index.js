import React from 'react';
import propTypes from 'prop-types';
import { declOfNum, getMeta } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import './style.css';

export function Controls({ onClick, cart }) {
  const [count, price] = getMeta(cart)

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине:
      </div>
      {!!count && <div className={cn('count')}>
        {count.toLocaleString()} {declOfNum(count, ["товар", "товара", "товаров"])} / {price.toLocaleString()} ₽
      </div>}
      {!count && <div className={cn('count')}>пусто</div>}
      {!!count && <button className={cn('button')} onClick={onClick}>Перейти</button>}
    </div>
  )
}

Controls.propTypes = {
  onClick: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(Controls);
