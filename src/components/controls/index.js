import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({countOfItems, totalPrice, setOpenCart}){
  const cn = bem('Controls');
console.log("Render Controls");
  return (
    <div className={cn()}>

      <span className={cn('text')}>В корзине:</span>
      <span className={cn('data')}>
        { countOfItems 
          ? `${countOfItems}
             ${plural(countOfItems, 'товар', 'товара', 'товаров')} / 
             ${totalPrice.toLocaleString('ru')} ₽` 
          : "пусто" }
        </span>
      <button onClick={() => setOpenCart(true)} className={cn('button')}>
        Перейти
      </button>
    
    </div>
  )
}

Controls.propTypes = {
  setOpenCart: propTypes.func.isRequired,
  countOfItems: propTypes.number.isRequired,
  totalPrice: propTypes.number,
}

Controls.defaultProps = {
  totalPrice: 0,
}

export default React.memo(Controls);
