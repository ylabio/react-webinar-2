import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddHandler: useCallback(() => {
      props.onAdd(props.item);
    }, [props.onAdd, props.item])
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        <span>
          {new Intl.NumberFormat("ru-RU", {
            style: 'currency', 
            currency: 'RUB',
            currencyDisplay: "symbol",
            maximumFractionDigits: 0
          }).format(props.item.price)}
        </span>
      </div>
      <div className={cn('actions')}>
        <button
        onClick={callbacks.onAddHandler}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddHandler: propTypes.func.isRequired
}

Item.defaultProps = {
  onAddHandler: () => {},
}

export default React.memo(Item);
