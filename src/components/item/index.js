import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {toRubPrice} from "../../utils";

function Item({item, addItemToCart}) {
  const cn = bem('Item');

  const callbacks = {
    addItemToCart: useCallback(() => {
      addItemToCart(item.code, item);
      },[addItemToCart, item]
    )
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
        {toRubPrice(item.price)}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.addItemToCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItemToCart: propTypes.func,
}

Item.defaultProps = {
  addItemToCart: () => {},
}

export default React.memo(Item);
