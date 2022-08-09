import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

const ItemInBin = ({ item, onDeleteItemFromBin }) => {
  const cn = bem('Popup');
  if (item.addCounter > 0) {
    return (
      <>
        <div className={cn('item-flex-start')}>
          <div className={cn('item-number')}>{item.code}</div>
          <div className={cn('item-title')}>{item.title}</div>
        </div>
        <div className={cn('item-flex-end')}>
          <div className={cn('item-price')}>{`${item.price.toLocaleString(
            'ru-RU'
          )} ₽`}</div>
          <div className={cn('item-counter')}>{`${item.addCounter} шт`}</div>
          <div className={cn('actions')}>
            <button onClick={() => onDeleteItemFromBin(item.code)}>
              Удалить
            </button>
          </div>
        </div>
      </>
    );
  }
};

ItemInBin.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteItemFromBin: propTypes.func.isRequired,
};

export default React.memo(ItemInBin);
