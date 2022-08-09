import React, { useMemo } from 'react';
import plural from 'plural-ru';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function orderToString(order){
  if (!order) return 'пусто'
  return `${order.amount} ${plural(order.amount, 'товар', 'товара', 'товаров')} / ${Intl.NumberFormat('ru-RU').format(order.cost)} ₽`;
}

function Controls(props){
  const cn = bem('Controls');

  const {order, setModalActive} = props;

  let strinOrder = useMemo(() => orderToString(order), [order])

  return (
    <div>
      <div className='Controls'>
      <div>В корзине: </div>
        <div className={cn('table')}>
          {strinOrder}
      </div>
        <button onClick={() => setModalActive(true)}>Перейти</button>
      </div>
    </div>
  )
}

export default React.memo(Controls);