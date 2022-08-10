import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item( {item, action }) {
  const cn = bem('Item');

  const callbacks = {
    clickItemHandler: useCallback((e) => {
      e.stopPropagation();
      action(item.code)
    }, [action,  item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price.toLocaleString('ru')} ₽
      </div>
      { item.amount && <div className={cn('amount')}>
        {item.amount} шт
      </div> }
      <div className={cn('actions')}>
        <button onClick={callbacks.clickItemHandler}>
          Удалить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  action: propTypes.func,
}

Item.defaultProps = {
  action: () => {}
}

export default React.memo(Item);
