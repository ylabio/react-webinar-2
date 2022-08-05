import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import plural from "plural-ru";
import {getAllCartItemsCost} from "../../utils";


function Controls({onOpenCart, cartItems, children}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("subscribe")}>
        В корзине:
        <strong className={cn("subscribe-strong")}>
          {!cartItems.length ? 'пусто' : `${plural(cartItems.length, "%d товар", "%d товара", "%d товаров")} / ${getAllCartItemsCost(cartItems).toLocaleString('ru')} ₽`}
        </strong>
      </div>
      <button onClick={onOpenCart}>Перейти</button>
      {children}
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onOpenCart: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
