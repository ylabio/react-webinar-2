import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem({item, onButtonClick}) {
  const cn = bem('Item');

  const callbacks = {
    onButtonClick: useCallback(() => {
      onButtonClick(item)
    }, [onButtonClick, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('info')}>
        {item.price.toLocaleString('ru-RU')} &#8381;
        <span className={cn('amount')}>{item.amount.toLocaleString('ru-RU')} шт</span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onButtonClick}>Удалить</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onButtonClick: propTypes.func
}

CartItem.defaultProps = {
  onButtonClick: () => {}
}

export default React.memo(CartItem);
