import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}> 
      <div className={cn('title')}>
      <Link
          to={props.itemLink}
          onClick={props.closeModal}
        >
          {props.item.title}
        </Link>
        </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price, {maximumFractionDigits: 0})} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  itemLink: propTypes.string,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
}

ItemBasket.defaultProps = {
  itemLink: '/',
  onRemove: () => {},
  closeModal: () => {}
}

export default React.memo(ItemBasket);
