import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    addProductToCart: useCallback(() => {
      props.onAddProductToCart(props.item)
    }, [props.onAddProductToCart, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {`${props.item.price.toLocaleString()} ₽`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.addProductToCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addProductToCart: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  addProductToCart: () => {}
}

export default React.memo(Item);
