import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";

/**
 * Контрол с общими действиями
 * @param props
 * @param {function} props.onModalOpen Ивент на открытии модалки
 * @param {Number} props.countItems Общее кол-во товаров в корзине
 * @param {Number} props.totalPrice Общая цена товаров в корзине
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Controls(props){
  const cn = bem('Controls');
  const {totalPrice, onModalOpen, shoppingCart} = props;
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
  totalPrice: propTypes.number.isRequired,
  onModalOpen: propTypes.func,
  shoppingCart: propTypes.arrayOf(propTypes.object).isRequired
}

Controls.defaultProps = {
  totalPrice: 0,
  shoppingCart: []
}

export default React.memo(Controls);
