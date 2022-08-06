import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";
import './style.css';

function Controls({cart, totalCartPrice, onCartOpen}){
  let cn = bem("Controls")
  let itemsInCartCount = useMemo(() => Object.keys(cart).length , [cart]);
  return (
    <div className={cn()}>
      <span className={cn("cart")}>
        В корзине: <span className={cn("cart-count")}>
          {itemsInCartCount >= 1 ?
          `${plural(itemsInCartCount, "%d товар", "%d товара", "%d товаров")} / ${totalCartPrice} ₽`
          :
          "пусто"
          }
        </span>
      </span>
      <button onClick={() => onCartOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.array.isRequired, // Обязательное свойство - корзина
  totalCartPrice: propTypes.number.isRequired, // Обязательное свойство - общая цена корзины
  onCartOpen: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  cart: [], // Значение по умолчанию - пустая корзина
  totalCartPrice: 0, // Значение по умолчанию - цена корзины при отсутсвии в ней товаров
  onCartOpen: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
