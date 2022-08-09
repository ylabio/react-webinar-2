import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from "plural-ru";

/**
 * Контрол с общими действиями
 * @param props
 * @param {function} props.onModalOpen Ивент на открытии модалки
 * @param {number} props.totalAmount Кол-во уникальных товаров
 * @param {number} props.totalPrice Общая цена товаров в корзине
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Controls(props){
  const cn = bem('Controls');
  const {onModalOpen, totalPrice, totalAmount} = props;
  const cartInfo = `${totalAmount} ${plural(totalAmount, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString('ru-RU')} ₽`;

  return (
    <div className={cn()}>
      <p className={cn('cart')}>
        В корзине:
        <span className={cn('cart-info', {empty: !totalAmount})}>
          {`${totalAmount ? cartInfo : 'пусто'}`}
        </span>
      </p>
      <button onClick={onModalOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: propTypes.func.isRequired,
  totalAmount: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
}

Controls.defaultProps = {
}

export default React.memo(Controls);
