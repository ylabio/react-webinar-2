import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './styles.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
    closeModal: useCallback(() => props.closeModal(), []),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <Link to={`${props.link}`} className={cn('title')} onClick={() => callbacks.closeModal()}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  link: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);
