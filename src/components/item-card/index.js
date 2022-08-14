import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import numberFormat from '../../utils/number-format';

function ItemCard(props) {
  const cn = bem('ItemCard');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {props.item?._id
        ? <>
          <p className={cn('desc')}>{props.item.description}</p>
          <span className={cn('desc')}>
        Страна производитель: <b>{props.item.maidIn.title} ({props.item.maidIn.code})</b>
      </span>
          <span className={cn('desc')}>Категория: <b>{props.item.category.title}</b></span>
          <span className={cn('desc')}>Год выпуска: <b>{props.item.edition}</b></span>
          <strong className={cn('price')}>Цена:&nbsp; {numberFormat(props.item.price)} ₽</strong>
          <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
        </>
        : <h2 style={{ textAlign: 'center' }}>Loading...</h2>
      }
    </div>
  );
};

ItemCard.propTypes = {
  item: propTypes.object,
  onAdd: propTypes.func,
};

ItemCard.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemCard);
