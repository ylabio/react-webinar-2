import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import './styles.css';
import { Link } from 'react-router-dom';
import translate from '../../utils/translate';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <Link className={cn('title')} to={props.address} onClick={props.onClose}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {`${numberFormat(props.item.amount || 0)} ${translate(props.language, 'qty')}`}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate(props.language, 'delete')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  address: propTypes.string,
  language: propTypes.string.isRequired,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  address: '/',
};

export default React.memo(ItemBasket);
