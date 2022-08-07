import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import {getPriceFormatter} from '../../utils';

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

    onPutItemToBasket: useCallback((e) => {
      e.stopPropagation();
      props.onPutItemToBasket(props.item.code)
    }, [props.onPutItemToBasket,  props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
      {getPriceFormatter().format(props.item.price)}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onPutItemToBasket}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onPutItemToBasket: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onPutItemToBasket: () => {}
}

export default React.memo(Item);
