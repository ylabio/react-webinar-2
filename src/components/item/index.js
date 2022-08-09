import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {getCurrencyPrice} from '../../utils'; // формирует представление числа в виде 1000 000 Р
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    handleAction: useCallback((e) => {
      e.stopPropagation();
      props.handleAction(props.item.code)
    }, [props.handleAction, props.item])
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
