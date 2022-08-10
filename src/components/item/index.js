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
    <div className={props.item.count? cnCart() : cn()}>
      <div className={props.item.count? cnCart('number') : cn('number')}>
        {props.item.code}
      </div>
      {!props.item.count && <>
        <div className={cn('title')}>
          <span>{props.item.title}</span>
          <span>{props.item.price.toLocaleString()} &#8381;</span>
        </div>
      </>}
      {props.item.count && <>
        <div className={cnCart('title')}>
          <span>{props.item.title}</span>
        </div>
        <div className={cnCart('price')}>
          <p>{props.item.price.toLocaleString()} &#8381;</p>
          <p>{props.item.count} шт</p>
        </div>
      </>}
      <div className={props.item.count? cnCart('actions') : cn('actions')}>
        <button onClick={callbacks.onSelect}>
          {props.item.count? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemAdd: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired
}

Item.defaultProps = {
  onDelete: () => {},
  itemAdd: () => {}
}

export default React.memo(Item);
