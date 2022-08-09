import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemCart(props) {
  const cn = bem('Item');

  const callbacks = {
    onDeleteCart: useCallback((e) => {
      e.stopPropagation();
      props.onDeleteCart(props.item.code)
    }, [props.onDeleteCart,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        {props.item.price.toLocaleString('ru-RU') + ' ₽'}
      </div>
      <div className={cn('actions')}>
        {props.item.count} шт
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteCart}>
          Удалить
        </button>
      </div>  
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteCart: propTypes.func.isRequired
}

ItemCart.defaultProps = {
}

export default React.memo(ItemCart);
