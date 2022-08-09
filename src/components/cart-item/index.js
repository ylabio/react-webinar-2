import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { currencyFormat } from '../../utils';

function CartItem({ item, onDelete }) {
  const cn = bem('CartItem');
  const modifiedPrice = currencyFormat(item.price, 0);

  const callbacks = {
    onDelete: useCallback(() => {
      onDelete(item)
    }, [onDelete, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>      
      <div className={cn('price')}>{modifiedPrice}</div>
      <div className={cn('amount')}>
        {`${item.count}`}<span className={cn('label')}>шт</span>
      </div>

      <button
        className={cn('button')}
        onClick={callbacks.onDelete}
      >
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
};

CartItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartItem);
