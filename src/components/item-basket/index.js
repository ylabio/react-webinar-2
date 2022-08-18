import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(props.item._id), [props.onClose, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`product${props.item._key}`} className={cn('titleLink')} onClick={callbacks.onClose} >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {}
}

export default React.memo(ItemBasket);