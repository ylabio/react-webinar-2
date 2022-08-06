import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');



  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAddToCart(props.item)
    }, [props.onAddToCart,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price}&nbsp;&#8381;
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
    onAdd: propTypes.func.isRequired
}

Item.defaultProps = {
    onAdd: () => {}
}

export default React.memo(Item);
