import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({onModalBtn, items}){
  const cn = bem('Controls');
  const amount = items.reduce((a, b) => a + b.count, 0)
  const totalPrice = items.reduce((a, b) => a + b.price*b.count, 0)

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине: </div>
      <div className={cn('amount')}> 
        {items.length ? 
          `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString('ru')} руб.`
            : 
          'пусто'}  
      </div>
      <button onClick={onModalBtn}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalBtn: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onModalBtn: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
