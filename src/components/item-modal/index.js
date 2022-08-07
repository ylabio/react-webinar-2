import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemModal({ item, index, onDelete }) {
  const cn = bem('ItemModal');

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      onDelete(item.code)
    }, [])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {index + 1}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <p className={cn('price')}>
        {item.price.toLocaleString('ru-RU', { 
          style: 'currency', 
          currency: 'RUB', 
          minimumFractionDigits: 0 
        })}
      </p>
      <p className={cn('count')}>
        {item.count} шт
      </p>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemModal.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  onDelete: propTypes.func.isRequired
}

ItemModal.defaultProps = {
  onDelete: () => {}
}

export default React.memo(ItemModal);
