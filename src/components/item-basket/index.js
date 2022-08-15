import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback((e) => props.onClose(), [])

  };

  return (
    <div className={cn()}>
      <Link to={props.itemPageLink} className={cn('title')} onClick={callbacks.onClose}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>Удалить</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  itemPageLink: propTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  itemPageLink: ''
}

export default React.memo(ItemBasket);
