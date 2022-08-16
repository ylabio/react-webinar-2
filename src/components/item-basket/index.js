import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemBasket({ item, itemLink, onRemove, closeModal, langPack }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: useCallback((e) => onRemove(item._id), [onRemove, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link
          to={itemLink}
          onClick={closeModal}
        >
          {item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(item.price)} {langPack.currencySymbol}
        </div>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {langPack.quantity}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{langPack.removeButton}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  itemLink: propTypes.string,
  onRemove: propTypes.func,
  closeModal: propTypes.func,
  langPack: propTypes.object.isRequired
};

ItemBasket.defaultProps = {
  itemLink: '/',
  onRemove: () => {},
  closeModal: () => {}
};

export default React.memo(ItemBasket);
