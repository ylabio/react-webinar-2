import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onNav: useCallback(() => props.redirectTo(props.item._id), [props.redirectTo, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={callbacks.onNav}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translate.num}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translate.btn}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  translate: propTypes.object,
  onRemove: propTypes.func,
  redirectTo: propTypes.func
}

ItemBasket.defaultProps = {
  translate: {
    btn: 'text',
    num: 'text'
  },
  redirectTo: () => {},
  onRemove: () => {}
}

export default React.memo(ItemBasket);
