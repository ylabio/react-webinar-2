import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CardItem(props) {
  
  const cn = bem('CardItem');

  const callbacks = {
    onDelete: useCallback((e) => {
      props.onDelete(props.item.code);
    }, [props.onDelete,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <span>{props.item.title}</span>
      </div>
      <div className={cn('price')}>
        <p>{props.item.price.toLocaleString()} &#8381;</p>
        <p>{props.item.count} шт</p>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

CardItem.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
  count: propTypes.number.isRequired
}

CardItem.defaultProps = {
  item: {},
  onDelete: () => {},
  count: 0
}

export default React.memo(CardItem);