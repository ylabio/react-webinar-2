import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';

function ItemDescription({ itemData, onAdd, _id }) {
  const cn = bem('ItemDescription');

  const { description, maidIn, maidInCode, category, edition, price } = itemData;

  const callbacks = {
    onAdd: useCallback((e) => onAdd(_id), [onAdd, _id])
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('description')}>
          {description}
        </div>
        <div className={cn('maidIn')}>
          <span className={cn('label')}>Страна производитель: </span>
          <span className={cn('info')}>{maidIn} ({maidInCode})</span>
        </div>
        <div className={cn('category')}>
          <span className={cn('label')}>Категория: </span>
          <span className={cn('info')}>{category}</span>
        </div>
        <div className={cn('edition')}>
          <span className={cn('label')}>Год выпуска: </span>
          <span className={cn('info')}>{edition}</span>
        </div>
        <div className={cn('price')}>
          <span className={cn('price-label')}>Цена: </span>
          <span className={cn('price-info')}>{price} ₽</span>
        </div>
      </div>
      <button className={cn('add')}
        onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  )
}

ItemDescription.propTypes = {
  itemData: propTypes.object,
  onAdd: propTypes.func,
  _id: propTypes.string
}

ItemDescription.defaultProps = {
  itemData: {},
  onAdd: () => { },
  _id: ""
}

export default React.memo(ItemDescription);
