import React, { useCallback } from 'react';
import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';

const ItemDetails = ({ item, onAdd }) => {
  const cn = bem('ItemDetails');

  const callbacks = {
    onAdd: useCallback(
      () => onAdd(item.result?._id),
      [onAdd, item.result?._id]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item.result?.description}</div>
      <div className={cn('maidIn')}>
        <div>Страна производитель:</div>
        <div>{item.result?.maidIn.title}</div>
        <div>({item.result?.maidIn.code})</div>
      </div>
      <div className={cn('category')}>
        <div>Категория: </div>
        <div>{item.result?.category.title}</div>
      </div>
      <div className={cn('edition')}>
        <div>Год выпуска: </div>
        <div>{item.result?.edition}</div>
      </div>
      <div className={cn('price')}>
        <div>Цена: </div>
        <div>{numberFormat(item.result?.price)} ₽</div>
      </div>
      <button className={cn('actions')} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
};

ItemDetails.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

ItemDetails.defaultProps = {};

export default React.memo(ItemDetails);
