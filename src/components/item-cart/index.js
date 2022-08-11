import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import prettyMoney from 'pretty-money';
import './style.css';

function ItemCart(props) {
  const cn = bem('ItemCart');

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
    }, [props.onDelete, props.item]),
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
        <span className={cn('cart')}>
          <span>{prettyMoney({currency: '₽', thousandsDelimiter: ' '}, props.item.price)}</span>
          <span>{`${props.item.amount} шт`}</span>
        </span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
}

ItemCart.defaultProps = {
  item: {},
  onSelect: () => {},
  onDelete: () => {},
}

export default React.memo(ItemCart);
