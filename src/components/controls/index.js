import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Button from '../ui/button';

function Controls({setVisable, items}){

  //! Суммируем цену выбранных товаров
  const product = items?.reduce((acc, item) => {
    return acc + item?.amount * item?.price
  }, 0);

  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('cart')}>В корзине:</span>
      <span className={cn('product-count')}>
        {items?.length > 0 ? (
          ` ${items.length} 
            ${plural(items.length, 'товар', 'товара', 'товаров')} / 
            ${product.toLocaleString('ru-RU')} ₽
          `
        ) : (
          'пусто'
        )}
      </span>
      <Button className={cn('btn')} onClick={() => setVisable(true)}>Перейти</Button>
    </div>
  )
}

Controls.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  setVisable: propTypes.func.isRequired 
}

Controls.defaultProps = {
  setVisable: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
