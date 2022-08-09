import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {calcPrice, formatNumber} from '../../utils.js';

function Controls({onOpenPanel, cartList}){
  const cn = bem('Controls');

  const calcCount = () => {
    if (cartList === undefined || cartList.length === 0) {
      return 0;
    }
    let orderCount = cartList.length;
    return orderCount
  }

  return (
    <div className={cn()}>
      <span className={cn("label")}>
          <p className={cn("paragraph")}>В корзине: </p>
          <p className={cn("paragraph-price")}> 
            {cartList.length > 0 ? (
            
            `${calcCount(cartList)} ${plural(calcCount(cartList), 'товар', 'товара', 'товаров')} / ${formatNumber(calcPrice(cartList))} ₽`
            
          ) : (
            "пусто"
          )}
          </p>
      </span>
      <button className={cn("btn")} onClick={onOpenPanel}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cartList: propTypes.array.isRequired,
  onOpenPanel: propTypes.func.isRequired,
  calcPrice: propTypes.func.isRequired,
}
Controls.defaultProps = {
  // cartList: [],
  // onOpenPanel: () => {},
  calcPrice: () => {},
}

export default React.memo(Controls);
