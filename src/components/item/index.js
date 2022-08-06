import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { getFormattedNumber } from '../../utils';

function Item({ item, index, buttonTitle, onClick }) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback(() => {
      onClick(item);
    }, [onClick, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {index + 1}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <span>
          {`${getFormattedNumber(item.price)} \u20bd`}
        </span>
        {buttonTitle === 'Удалить' &&
          <span>
            {`${item.quantity} шт`}
          </span>}
        <button onClick={callbacks.onClick}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  buttonTitle: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

export default React.memo(Item);
