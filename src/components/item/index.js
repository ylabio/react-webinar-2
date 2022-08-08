import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onAddItemInBasket: useCallback(() => {
      props.onAddItemInBasket(props.item.code);
    }, [props.onAddItemInBasket, props.item]),
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
        {props.item.price.toLocaleString('ru')} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={()=>callbacks.onAddItemInBasket(props.item.code)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItemInBasket: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  onAddItemInBasket: () => {}
}

export default React.memo(Item);
