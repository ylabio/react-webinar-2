import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getPriceOnRub} from '../../utils';
import './style.css';

function ItemCart({item, buttonName, onItemClick}) {
  const cn = bem('Item-cart');

  const callbacks = {

    onDeleteItem: useCallback((e) => {
      e.stopPropagation();
      onItemClick(item.code)
    }, [onItemClick, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('name')}>
        <p className={cn('number')}>{item.code}</p>
        <p className={cn('title')}>{item.title}</p>
      </div>
      <div className={cn('actions')}>
        <p className={cn('price')}>{getPriceOnRub(item.price)}</p>
        <p className={cn('count')}>{item.count} шт</p>
        <button onClick={callbacks.onDeleteItem}>
          {buttonName}
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
}

export default React.memo(ItemCart);
