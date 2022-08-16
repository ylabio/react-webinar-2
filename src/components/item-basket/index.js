import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), 
    [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(), [props.onClose, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.urlTo}  className={cn('title__pointer')} onClick={callbacks.onClose}>{props.item.title}</Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.pcs}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.buttonText}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  pcs: propTypes.string,
  buttonText: propTypes.string,
  urlTo: propTypes.string.isRequired
}

ItemBasket.defaultProps = {
  pcs: 'шт',
  buttonText: 'Удалить',
  onClose: () => {}
}

export default React.memo(ItemBasket);
