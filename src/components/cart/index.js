import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from "../list";

function Cart({onItemDeletion, items, total}){
  const cn = bem('Cart');
  const formattedTotalValue = total.toLocaleString('ru-RU');

  const callbacks = {
    onItemDeletion: useCallback((item) => {
      onItemDeletion(item);
    }, []),
  };

  return (
    <div className={cn()}>
      <List items={items.sort((a, b) => a.code - b.code)}
            onButtonClick={callbacks.onItemDeletion}/>
      <div className={cn('total')}>
        <span className={cn('label')}>Итого</span><span>{formattedTotalValue} &#8381;</span></div>
    </div>
  );
}

Cart.propTypes = {
  onItemDeletion: propTypes.func.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired
}

export default React.memo(Cart);
