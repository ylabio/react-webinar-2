import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import numberFormat from '../../utils/number-format';
import './styles.css';

function ItemBasket({item, text, onRemove, onItemOpen}) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback(e => onRemove(item._id), [onRemove, item]),
    onItemOpen: useCallback(() => onItemOpen(), [])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{item._id}</div>*/}
      <Link to={`/article/${item._id}`} className={cn('title')} onClick={callbacks.onItemOpen}>
        {item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {text.piece}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{text.remove}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  text: propTypes.object.isRequired,
  onRemove: propTypes.func,
  onItemOpen: propTypes.func
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);
