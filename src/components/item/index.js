import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { categoriesNumber } from '../../utils';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.item.code)
    }, [props.onAdd,  props.item]),
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
        {categoriesNumber(props.item.price)}
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
