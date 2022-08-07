import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item);
    }, [props.onSelect, props.item]),
  };

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        <span className={cn('price')}>{props.item.price.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
}

Item.defaultProps = {
  onClick: () => {}
}

export default React.memo(Item);
