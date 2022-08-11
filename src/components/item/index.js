import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {currency} from '../../utils.js';
import './style.css';

function Item({item, onAddProduct}) {
  const cn = bem('Item');

  const callbacks = {
    onAddProduct: useCallback((e) => {
      e.stopPropagation();
      onAddProduct(item.code)
    }, [])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <p className={cn('price')}>
        {currency(item.price)}
      </p>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddProduct}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddProduct: propTypes.func.isRequired
}

Item.defaultProps = {
  onAddProduct: () => {}
}

export default React.memo(Item);
