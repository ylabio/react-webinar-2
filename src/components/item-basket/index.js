import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(
      (e) => props.onRemove(props.item._id),
      [props.onRemove, props.item]
    ),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link
          className={cn('title-text')}
          to={`/${props.item._id}`}
          onClick={props.onClose}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>
            {props.dictionary.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);
