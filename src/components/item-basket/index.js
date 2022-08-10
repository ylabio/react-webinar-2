import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CustomButton from '../custom-button';
import './style.css';

/* Компонент товара из корзины */
function ItemBasket({item, callback}) {
  const cn = bem('ItemBasket');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{item.price.toLocaleString('ru-RU')} &#8381;</div>
        <div className={cn('quantity')}>{item.count} шт</div>
        <CustomButton onClick={() => callback(item.code)}>
          Удалить
        </CustomButton>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired,
}

export default React.memo(ItemBasket);
