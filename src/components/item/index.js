import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import { prettify } from './../../utils';
import './style.css';

function Item({ item, btnText, btnHandler, countClass }) {
  const cn = bem('Item');

  const callbacks = {
    btnHandler: useCallback(() => {
      btnHandler(item.code)
    }, [btnHandler, item]),
  };

  return (
    <div className={cn({ 'selected': item.selected })} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
        <span className={cn('price')}> {prettify(item.price)} ₽</span>
        <span className={cn('count', [countClass])}> {item.cartCount} шт</span>
      </div>
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.btnHandler}>
          {btnText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  btnHandler: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  btnHandler: () => { },
}

export default React.memo(Item);
