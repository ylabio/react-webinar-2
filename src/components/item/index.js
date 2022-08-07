import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    btnClick: useCallback((e) => {
      e.stopPropagation()
      props.btnClick(props.item.code)
  }, [props.btnClick, props.item])
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
        {props.item.price.toLocaleString() + ' ₽'}
      </div>
      {props.item.amount ? <div className={cn('amount')}>{props.item.amount.toLocaleString() + ' шт'}</div> : null}
      <div className={cn('actions')}>
        <button onClick={callbacks.btnClick}>
          {props.btnLabbel}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  btnClick: propTypes.func.isRequired,
  btnLabbel: propTypes.string.isRequired
}

Item.defaultProps = {
  item: {},
  btnClick: () => {},
  btnLabbel: 'Button'
}

export default React.memo(Item);
