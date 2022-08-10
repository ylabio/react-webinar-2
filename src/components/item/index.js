import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import { formatNumber } from '../../utils';
import {cn as bem} from "@bem-react/classname";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAdd(props.item.code)
    }, [props.onAdd,  props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {formatNumber(props.item.price)} ₽
      </div>
      <div className={cn('actions')}>
        <button className={cn('actions__button')} onClick={callbacks.onAdd}>
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
