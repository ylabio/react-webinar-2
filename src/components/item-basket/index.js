import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(() => props.onRemove(props.item._id), [props.onRemove,  props.item]),
    onClose: useCallback(() => props.onClose(props.item._id), [props.onClose, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={`${props.address.replace(':productNumber', props.item._key)}`}
          className={cn('titleLink')}
          onClick={callbacks.onClose}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}
          {props.text.pcs}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {props.text.remove}
          </button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  address: propTypes.string.isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  text: propTypes.object,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  text: {},
}

export default React.memo(ItemBasket);
