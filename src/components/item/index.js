import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import numeral from 'numeral';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onAddCart: useCallback((e) => {
      e.stopPropagation();
      props.item.addCount = props.item.addCount + 1;
      props.onAddCart(props.item)
    }, [props.onAddCart])
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
        {numeral(props.item.price).format('0,0')} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddCart}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddCart: propTypes.func.isRequired
}

Item.defaultProps = {
  onAddCart: () => { }
}

export default React.memo(Item);
