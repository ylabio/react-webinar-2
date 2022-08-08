import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Controls({ setModal, items }) {
  const sum = items?.reduce((acc, item) => {
    return acc + item?.price * item?.amount
  }, 0)

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <span className={cn('cart')}>В корзине:</span>
      <span className={cn('product-count')}>
        {items?.length > 0 ? (
          ` ${items.length} 
            ${plural(items.length, 'товар', 'товара', 'товаров')} / 
            ${sum.toLocaleString('ru-RU')} ₽
          `
        ) : (
          'пусто'
        )}
      </span>
      <button className={cn('btn')} onClick={() => setModal(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  setModal: propTypes.func.isRequired
}

Controls.defaultProps = {
  setModal: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
