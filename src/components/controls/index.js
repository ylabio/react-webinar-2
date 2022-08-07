import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import plural from 'plural-ru';
function Controls({totalPrice, basket, changeBasketVisible}){
  const cn = bem('Controls');
  return(
    <div className={cn()}>
      <>
        {
          basket.length ?
            <div className={cn('basket-full')}>
              <div>В корзине:</div> 
              <diV><strong>{basket.length} {plural(basket.length, 'товар', 'товара', 'товаров')} / {totalPrice.toLocaleString('ru')} ₽ </strong></diV>
            </div>  
          :
            <div className={cn('basket-empty')}>
              <div>В корзине:</div> 
              <div><strong>пусто</strong></div>
            </div>
        }   
            <div className={cn('button')}>
              <button onClick={()=>changeBasketVisible(true)}>
                Перейти
              </button>
            </div> 
      </>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number.isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  changeBasketVisible: propTypes.func.isRequired
}

Controls.defaultProps = {
  totalPrice: 0,
  basket: [],
  changeBasketVisible: () => {}
}

export default React.memo(Controls);
