import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const price = props.item.price.toLocaleString(
    'ru', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0}
  );

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAddItem(props.item);
    }, [props.item]),
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <span>{props.item.title}</span>
        <span className={cn({'price': true})}>{price}</span>
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
  onAddItem: propTypes.func.isRequired,
}

Item.defaultProps = {
  onAddItem: () => {},
}

export default React.memo(Item);
