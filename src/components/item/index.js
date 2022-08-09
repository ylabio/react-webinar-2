import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddCart(props.item.code)
    }, [props.onAddCart,  props.item])
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
        <button onClick={callbacks.onAddCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddCart: propTypes.func.isRequired
}

Item.defaultProps = {
}

export default React.memo(Item);
