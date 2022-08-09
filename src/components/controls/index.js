import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";

/**
 * Контрол с общими действиями
 * @param props
 * @param {function} props.onModalOpen Ивент на открытии модалки
 * @param {Array} props.shoppingCart Массив уникальных товаров
 * @param {number} props.totalPrice Общая цена товаров в корзине
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Controls(props){
  const cn = bem('Controls');
  const {shoppingCart, onModalOpen, totalPrice} = props;
  const cartInfo = `${shoppingCart.length} ${plural(shoppingCart.length, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString('ru-RU')} ₽`;

  return (
    <div className={cn()}>
      <p className={cn('cart')}>
        В корзине:
        <span className={cn('cart-info', {empty: !shoppingCart})}>
          {`${shoppingCart.length ? cartInfo : 'пусто'}`}
        </span>
      </p>
      <button onClick={onModalOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: propTypes.func.isRequired,
  shoppingCart: propTypes.array.isRequired,
}

Controls.defaultProps = {
}

export default React.memo(Controls);
