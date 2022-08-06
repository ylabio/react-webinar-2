import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onSelect: useCallback((e) => {
      props.itemAdd(props.item.code);
    }, [props.onSelect, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <span>{props.item.title}</span>
        <span>{props.item.price.toLocaleString()} &#8381;</span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onSelect}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  itemAdd: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  itemAdd: () => {}
}

export default React.memo(Item);
