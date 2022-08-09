import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import plural from 'plural-ru';

function Controls({totalPrice, numUniqueItems, changeModalVisible}) {
  const cn = bem('Controls');
  
  return (
    <div className={cn()}>
      <>
        {
          numUniqueItems ?
            <div className={cn('basket', {value: 'full'})}>
              <div>В корзине:</div> 
              <div>
                <strong>{numUniqueItems} {plural(numUniqueItems, 'товар', 'товара', 'товаров')} / {totalPrice.toLocaleString('ru')} ₽ </strong>
              </div>
            </div>  
          :
            <div className={cn('basket' , {value: 'empty'})}>
              <div>В корзине:</div> 
              <div>
                <strong>пусто</strong>
              </div>
            </div>
        }   
            <div className={cn('button')}>
              <button onClick={()=>changeModalVisible(true)}>
                Перейти
              </button>
            </div> 
      </>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: propTypes.number.isRequired,
  numUniqueItems: propTypes.number.isRequired,
  changeModalVisible: propTypes.func.isRequired
}

export default React.memo(Controls);
