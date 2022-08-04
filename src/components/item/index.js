import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {formatPrice} from '../../utils';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
		onAddToCart: useCallback((e) => {
			e.stopPropagation();
      props.onAddToCart(props.item);
		}, [props.onAddToCart])
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
				{formatPrice(props.item.price)} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
	onAddToCart: propTypes.func
}

Item.defaultProps = {
	onAddToCart: () => {}
}

export default React.memo(Item);
