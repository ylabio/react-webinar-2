import React from 'react';
import propTypes from 'prop-types';
import { declOfNum } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import './style.css';

export function Controls({ onClick, cart, getMeta }) {
  const [cartlength, , price] = getMeta(cart)
  const cn = bem('Controls');

  return (

    <div className={cn()}>
      <div className={cn('cart')}>
        В корзине:
      </div>
      {!!cartlength && <div className={cn('count')}>
        {cartlength.toLocaleString()} {declOfNum(cartlength, ["товар", "товара", "товаров"])} / {price.toLocaleString()} ₽
      </div>}
      {!cartlength && <><div className={cn('count')}>пусто</div> <button className={cn('button')}>Перейти</button></>}
      {!!cartlength && <button className={cn('button')} onClick={onClick}>Перейти</button>}
    </div>

  )
}

Controls.propTypes = {
  onClick: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(Controls);
