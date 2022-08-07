import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {

    onClick: useCallback(() => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, [props.onSelect, props.item, setCount, count]),

    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
    }, [props.onDelete,  props.item]),

    onAddToCart: useCallback((e) => {
      e.stopPropagation();
      props.onAddToCart(props.item.code)
    }, [props.onAddToCart, props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <span>
          {props.item.title}
        </span>
        <span>
        {`${props.item.price} ₽`}
        </span>
      </div>
      <div className={cn('actions')}>
        {
          props.isCartItem
            ? (<button onClick={callbacks.onDelete}>
                Удалить
              </button>)
            : (<button onClick={callbacks.onAddToCart}>
                Добавить
              </button>)
        }
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  isCartItem: propTypes.bool,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func,
  onAddToCart: propTypes.func,
}

Item.defaultProps = {
  isCartItem: false,
  onSelect: () => {},
  onDeleted: () => {},
  onAddToCart: () => {},
}

export default React.memo(Item);
