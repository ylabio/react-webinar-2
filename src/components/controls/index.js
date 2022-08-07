import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {getInfoCart} from "../../utils";

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
  const {countItems, totalPrice, onModalOpen} = props;
  const cartInfo = useMemo(() => getInfoCart(countItems, totalPrice), [countItems, totalPrice]);

  return (
    <div className={cn()}>
      <p className={cn('cart')}>
        В корзине:
        <span className={cn('cart-info', {empty: !countItems})}>
          {`${countItems ? cartInfo : 'пусто'}`}
        </span>
      </p>
      <button onClick={onModalOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  countItems: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
  onModalOpen: propTypes.func.isRequired
}

Controls.defaultProps = {
  countItems: 0,
  totalPrice: 0,
  onModalOpen: () => {}
}

export default React.memo(Controls);
