import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemPage(props) {
  const cn = bem('ItemPage');
  const item = props.item;
  const product = item.product;

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(product._id), [props.onAdd, product]),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{product.description}</div>
      <div className={cn('country')}>
        Страна производитель: <span className={cn('bold')}>{item.country}</span>
      </div>
      <div className={cn('category')}>
        Категория: <span className={cn('bold')}>{item.category}</span>
      </div>
      <div className={cn('year')}>
        Год выпуска: <span className={cn('bold')}>{product.edition}</span>
      </div>
      <div className={cn('price')}>{`Цена: ${numberFormat(product.price)} ₽`}</div>

      <button className={cn('button')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ItemPage.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

export default React.memo(ItemPage);
