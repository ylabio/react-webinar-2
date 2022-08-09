import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import CustomButton from '../custom-button';
import './style.css';

function Item({item, callback, btnName}) {
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
        {item.count && <div className={cn('quantity')}>{item.count} шт</div>}
        <CustomButton onClick={() => callback(item)}>
          {btnName}
        </CustomButton>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired,
  btnName: propTypes.string.isRequired,
}

export default React.memo(Item);
