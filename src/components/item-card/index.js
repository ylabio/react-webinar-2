import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import numberFormat from '../../utils/number-format';

function ItemCard({ item, onAdd, langPack }) {
  const cn = bem('ItemCard');

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      {item?._id
        ? <>
          <p className={cn('desc')}>{item.description}</p>
          <span className={cn('desc')}>
            {langPack.country} <b>{item.maidIn.title} ({item.maidIn.code})</b>
          </span>
          <span className={cn('desc')}>{langPack.category} <b>{item.category.title}</b></span>
          <span className={cn('desc')}>{langPack.year} <b>{item.edition}</b></span>
          <strong
            className={cn('price')}>{langPack.price}&nbsp; {numberFormat(item.price)} {langPack.currencySymbol}
          </strong>
          <button className={cn('button')} onClick={callbacks.onAdd}>{langPack.addButton}</button>
        </>
        : <h2 style={{ textAlign: 'center' }}>Loading...</h2>
      }
    </div>
  );
};

ItemCard.propTypes = {
  item: propTypes.object,
  onAdd: propTypes.func,
  langPack: propTypes.object.isRequired
};

ItemCard.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemCard);
