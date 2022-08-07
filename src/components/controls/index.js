import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import Modal from '../modal';
import Totalprice from '../totalprice';

function Controls(props){

  const cn = bem('Controls');
  const[show, setShow] = useState(false)

  return (
    <div className='Controls' >
      В корзине:
      {(props.cart.length !== 0) 
      ?<div className={cn('basket')}>
        <div className={cn('length')}>{`${props.cart.length} ${plural(props.cart.length, 'товар', 'товара', 'товаров')}`}</div>
        <div className={cn('price')}>
            <Totalprice items={props.cart} 
                        totalPrice={props.totalPrice}/> 
        </div>
      </div>
      : <div className={cn('basket')}>
          пусто
        </div>
      }
      <button onClick={() => setShow(true)} >Перейти</button>
      <Modal  show={show}
              items={props.cart}
              totalPrice={props.totalPrice}
              onDeleteItems={props.onDeleteItems}
              onClose={() => setShow(false)}/>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
  onDeleteItems: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onDeleteItems: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
