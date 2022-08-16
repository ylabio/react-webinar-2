import React from 'react';
import './style.css';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import { useCallback } from 'react';
import propTypes from 'prop-types';

function ItemDetails({ detail, addToBasket, content }) {
  const cn = bem('Details');

  const callbacks = {
    onAdd: useCallback(() => addToBasket(detail._id), [addToBasket, detail]),
  };

  return (
    <div className={cn()}>
      <div>{detail.description}</div>
      <div>
        Страна производитель:{' '}
        <b>
          {detail?.maidIn?.title} ({detail?.maidIn?.code})
        </b>
      </div>
      <div>
        Категория: <b>{detail?.category?.title}</b>
      </div>
      <div>
        Год выпуска: <b>{detail.edition}</b>
      </div>
      <div className={cn('price')}>Цена: {numberFormat(detail.price)} ₽</div>
      <button onClick={callbacks.onAdd}>{content.addToCart}</button>
    </div>
  );
}

ItemDetails.propTypes = {
  content: propTypes.object.isRequired,
  detail: propTypes.object.isRequired,
  addToBasket: propTypes.func,
};

ItemDetails.defaultProps = {
  addToBasket: () => {},
};

export default React.memo(ItemDetails);
