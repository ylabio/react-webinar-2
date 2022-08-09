import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({onModalBtn, items, totalPrice}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине: </div>
      <div className={cn('amount')}> 
        {items ? 
          `${items} ${plural(items, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString('ru')} ₽`
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
