import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {toRubPrice} from "../../../utils";

function CartItem({item, index, deleteCartItems}) {
  const cn = bem('CartItem');

  const callbacks = {
    deleteCartItems: useCallback(() => {
      deleteCartItems(item.code, item);
      }, [deleteCartItems, item]
    )
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {index}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {toRubPrice(item.price)}
      </div>
      <div className={cn('amount')}>
        {`${item.amount} шт`}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.deleteCartItems}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number,
  deleteCartItems: propTypes.func,
}

CartItem.defaultProps = {
  index: 0,
  deleteCartItems: () => {}
}

export default React.memo(CartItem);
