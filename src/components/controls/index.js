import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import { categoriesNumber } from '../../utils';


function Controls(props){

  const cn = bem('Controls');

  return (
    <div className='Controls' >
      В корзине:
      {(props.cart.length !== 0) 
      ?<div className={cn('basket')}>
        <div className={cn('length')}>{`${props.cart.length} ${plural(props.cart.length, 'товар', 'товара', 'товаров')}`}</div>
        <div className={cn('price')}>
          {categoriesNumber(props.totalPrice)} 
        </div>
      </div>
      : <div className={cn('basket')}>
          пусто
        </div>
      }
      <button onClick={props.onOpen} >Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
}

Controls.defaultProps = {
}



export default React.memo(Controls);
