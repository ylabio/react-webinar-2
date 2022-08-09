import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {

  const cn = bem('Item');
  const cnCart = bem('CartItem');

  const callbacks = {
    onSelect: useCallback((e) => {
      props.itemAdd(props.item.code);
    }, [props.itemAdd, props.item])
  };

  return (
    <div className={props.isCart? cnCart() : cn()}>
      <div className={props.isCart? cnCart('number') : cn('number')}>
        {props.item.code}
      </div>
      {!props.isCart && <>
        <div className={cn('title')}>
          <span>{props.item.title}</span>
          <span>{props.item.price.toLocaleString()} &#8381;</span>
        </div>
        <div className={cn('actions')}>
          <button onClick={callbacks.onSelect}>
            Добавить
          </button>
        </div>
      </>}
      {props.isCart && <>
        <div className={cnCart('title')}>
          <span>{props.item.title}</span>
        </div>
        <div className={cnCart('price')}>
          <p>{props.item.price.toLocaleString()} &#8381;</p>
          <p>{props.item.count} шт</p>
        </div>
        <div className={cnCart('actions')}>
          <button onClick={callbacks.onSelect}>
            Удалить
          </button>
        </div>
      </>}
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemAdd: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
  isCart: propTypes.bool
}

Item.defaultProps = {
  isCart: false,
  onDelete: () => {},
  itemAdd: () => {}
}

export default React.memo(Item);
