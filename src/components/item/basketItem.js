import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getPriceFormatter} from '../../utils'
import './basketstyle.css';


function BasketItem({item, onItemDelete}) {
    const cn = bem('Item');
    const callbacks = {
      onItemDelete: useCallback(() => {
        onItemDelete(item.code);
      }, [onItemDelete,  item])
    };
    return (
      <div className='Item'>
        <div className={cn('number')}>
          {item.code}
        </div>
        <div className={cn('title')}>
          {item.title}
        </div>
        <div className={cn('price')}>
        {getPriceFormatter().format(item.price)}
        </div>
        <div className={cn('count')}>
        {item.count}{'\u00A0'}шт
        </div>
        <div className={cn('actions')}>
          <button onClick={callbacks.onItemDelete}>
            Удалить
          </button>
        </div>
      </div>
    )
  }

BasketItem.propTypes = {
  item: propTypes.object.isRequired,
  onItemDelete: propTypes.func.isRequired,
}
  
BasketItem.defaultProps = {
  onItemDelete: () => {},
}

export default BasketItem;