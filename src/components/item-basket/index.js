import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`${props.linkTo}/${props.item._id}`}
          className={cn('link')}
          onClick={props.closeModal}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.text.quantity}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.text.delete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
  linkTo: propTypes.string,
  text: propTypes.object
}

ItemBasket.defaultProps = {
  onRemove: () => { },
  closeModal: () => { },
  linkTo: "/",
  text: {}
}

export default React.memo(ItemBasket);
