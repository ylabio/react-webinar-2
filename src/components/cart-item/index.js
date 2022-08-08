import React from "react";
import Button from "../../shared/ui/button";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { formatPrice } from "../../shared/utils";
import propTypes from 'prop-types';

function CartItem ({ item, cb }) {
  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('blockLeft')}>
        <span>{item.data.code}</span>
        <span>{item.data.title}</span>
      </div>

      <div className={cn('blockRight')}>
        <span className={cn('price')}>
          {formatPrice(item.data.price) + ' ₽'}
        </span>
        
        <span className={cn('quantity')}>{item.quantity} шт</span>
        <Button 
          text='Удалить'
          onClick={() => cb(item)}
        />
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  cb: propTypes.func.isRequired,
};

CartItem.defaultProps = {
  cb: () => {},
};

export default React.memo(CartItem, (prev, next) => {
  return prev.item.data.time === next.item.data.time;
});