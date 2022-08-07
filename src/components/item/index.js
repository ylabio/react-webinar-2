import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { formatPrice } from '../../shared/utils';
import Button from '../../shared/ui/button';

function Item({ item, addItemToCart }) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {formatPrice(item.price)} ₽
      </div>
      <div className={cn('actions')}>
        <Button 
        text='Добавить' 
        onClick={() => addItemToCart(item)}
      />
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItemToCart: propTypes.func.isRequired,
};

Item.defaultProps = { 
  addItemToCart: () => {},
};

export default React.memo(Item);
