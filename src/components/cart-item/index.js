import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { currencyFormat } from '../../utils';

function CartItem({item, onDelete}) {
  const cn = bem('CartItem');


  const modifiedPrice = currencyFormat(item.price, 0);

  return (
    <div className={cn()} >
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
         {item.title}   
      </div>
      <div>
        {modifiedPrice}
      </div>
      <div className={cn('amount')}>
        {item.count}
      </div>
      <div className={cn('actions')}>
        <button onClick={()=> {
          console.log('das')
//добавить в usecallbacks
          onDelete(item.code)
          }}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

CartItem.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(CartItem);
