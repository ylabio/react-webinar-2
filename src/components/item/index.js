import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, number, children}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {number !== undefined ?
        number :
        item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price} ₽
      </div>
      {item.count !== undefined ?
      <div className={cn('count')}>
        {item.count} шт
      </div>
      :
      <></>}
      <div className={cn('actions')}>
        {children}
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
}

export default React.memo(Item);
