import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import { Link } from "react-router-dom"
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(), [props.onClose,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')} onClick={()=>(callbacks.onClose())}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.pcsText}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.deleteButtonName}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  pcsText: propTypes.string,
  deleteButtonName: propTypes.string,
  link: propTypes.string.isRequired
}

ItemBasket.defaultProps = {
  pcsText: 'шт',
  deleteButtonName: 'Удалить'
}

export default React.memo(ItemBasket);
