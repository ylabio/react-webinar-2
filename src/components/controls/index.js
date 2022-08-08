import React, { useContext } from 'react';
import { OrderContext } from '../../app';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function orderToString(order){
  if (!order) return 'пусто'
  return `${order.amount} ${plural(order.amount, 'товар', 'товара', 'товаров')} / ${order.cost} ₽`;
}

function Controls(){

  const cn = bem('Controls');

  const {order, setModalActive} = useContext(OrderContext);

  return (
    <div>
      <div className='Controls'>
      <div>В корзине: </div>
        <div className={cn('table')}>
          {orderToString(order)}
      </div>
        <button onClick={() => setModalActive(true)}>Перейти</button>
      </div>
    </div>
  )
}

export default React.memo(Controls);