import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "src/utils";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddToCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code)
    }, [props.onAddToCart, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <p>{props.item.title}</p>
        <p>{numberFormat(props.item.price)}</p>
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddToCart: propTypes.func.isRequired,
}

export default React.memo(Item);
