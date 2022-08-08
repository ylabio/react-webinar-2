import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import {getCurrencyPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    handleAction: useCallback((e) => {
      e.stopPropagation();
      props.handleAction(props.item.code)
    }, [props.onClick, props.item])
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
        {getCurrencyPrice(props.item.price)}
      </div>
      {!!props.item.count && <div className={cn('count')}>{props.item.count} шт</div>}      
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.handleAction}>
          {props.btnName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  handleAction: propTypes.func.isRequired,
  btnName: propTypes.string.isRequired,
}

Item.defaultProps = {
}

export default React.memo(Item);
