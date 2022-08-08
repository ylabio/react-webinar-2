import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import CartItem from '../cartItem';

function List({items, itemFunc, isInCart}) {
  const cn = bem('List');

  const callbacks = {
    onButtonClick: useCallback((item) => {
      itemFunc(item)
    }, [itemFunc])
  };

  return (
    <div className={cn()}>{items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        {isInCart === true ?
        <CartItem item={item} number={index + 1} buttonAction={callbacks.onButtonClick} />
        :
        <Item item={item} buttonAction={callbacks.onButtonClick} />}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.array,
  itemFunc: propTypes.func,
  isInCart: propTypes.bool,
}

List.defaultProps = {
  items: [],
  itemFunc: () => {},
  isInCart: false
}

export default React.memo(List);
