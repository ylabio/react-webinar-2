import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemInCart(props) {
  const cn = bem('Item-in-cart');

  const callbacks = {
    onItemDelete: useCallback(() => {
      props.onItemDelete(props.itemInCart.code);
    }, [props.onItemDelete,  props.itemInCart])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.itemInCart.code}
      </div>
      <div className={cn('title')}>
        {props.itemInCart.title}
        {`   `}
        {props.itemInCart.price}
        {props.itemInCart.amount ? ` | количество = ${props.itemInCart.amount} ` : null}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onItemDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemInCart.propTypes = {
  itemInCart: propTypes.object,
  onItemDelete: propTypes.func.isRequired
}

ItemInCart.defaultProps = {
  onItemDelete: () => {}
}

export default React.memo(ItemInCart);
