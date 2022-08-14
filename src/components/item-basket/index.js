import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import numberFormat from '../../utils/numberFormat';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(e => props.onRemove(props.item._id), [props.onRemove, props.item]),
    onItemOpen: useCallback(() => props.onItemOpen(), [])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <Link
        to={`/article/${props.item._id}`}
        className={cn('title')}
        onClick={callbacks.onItemOpen}
      >
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {props.local.basket.piece}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.local.common.remove}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onItemOpen: propTypes.func,
  local: propTypes.object
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);
