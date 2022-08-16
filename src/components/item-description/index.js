import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ItemDescription({item, onAdd}) {
  const cn = bem('ItemDescription');

  const callbacks = {
    onAdd: useCallback(() => onAdd(item._id), [onAdd, item])
  };

  return (
    <div className={cn()}>
      {
        item && item.description && <div className={cn('cell')}>
          {item.description}
        </div>
      }
      {
        item && item.maidIn && item.maidIn.title && <div className={cn('cell')}>
          Страна производитель: <span>{item.maidIn.title}</span>
        </div>
      }
      {
        item && item.category && item.category.title && <div className={cn('cell')}>
          Категория: <span>{item.category.title}</span>
        </div>
      }
      {
        item && item.edition && <div className={cn('cell')}>
          Год выпуска: <span>{item.edition}</span>
        </div>
      }
      {
        item && item.price && <div className={cn('price')}>
          Цена: <span>{numberFormat(item.price)} ₽</span>
        </div>
      }
      {
        item && callbacks.onAdd && <div className={cn('cell')}>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
      }
    </div>
  )
}

ItemDescription.propTypes = {
  item: propTypes.object,
  onAdd: propTypes.func,
}

ItemDescription.defaultProps = {
  item: {},
  onAdd: () => {},
}

export default React.memo(ItemDescription);