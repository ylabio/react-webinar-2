import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import {getFormattedPrice} from '../../utils'

function Item({ cart, item, addToCart, index, deleteItem }) {
  const cn = bem('Item');

  const callbacks = {
    addToCart: useCallback(() => {
      addToCart({
        code: item.code,
        price: item.price,
        title: item.title,
        count: 1,
      });
    }, [addToCart, item]),
    deleteItem: useCallback(() => {
      deleteItem(item.code);
    }, [deleteItem, item]),
  };

  console.log(cart.summ);

  return (
    <div className={cn()}>
      <div className={cn('number')}>{index + 1}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        {item.count !== undefined ? (
          <div className={cn('price')}>
            {`${getFormattedPrice(item.price * item.count)}`}
          </div>
        ) : (
          <div className={cn('price')}>{`${getFormattedPrice(item.price)}`}</div>
        )}

        {item.count !== undefined && (
          <div className={cn('quantity')}>
            {item.count} <div>шт.</div>
          </div>
        )}
        {item.count !== undefined ? (
          <button onClick={callbacks.deleteItem}>Удалить</button>
        ) : (
          <button onClick={callbacks.addToCart}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addToCart: propTypes.func.isRequired,
  deleteItem: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  cart: propTypes.object.isRequired,
};

Item.defaultProps = {
  addToCart: () => {},
  deleteItem: () => {},
  cart: {},
};

export default React.memo(Item);
