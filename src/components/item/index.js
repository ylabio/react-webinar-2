import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CustomButton from '../custom-button';
import './style.css';

/* Компонент товара из каталога */
function Item({item, callback}) {
  const cn = bem('Item');

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
        <CustomButton onClick={() => callback(item.code)}>
          Добавить
        </CustomButton>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired,
}

export default React.memo(Item);
