import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function Item({ cutting, item, addCart }) {
  const cn = bem('Item');

  return (
    <div className={cn({ selected: item.selected })}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{cutting(item.price)} ₽</div>
      <div className={cn('actions')}>
        <button onClick={() => addCart(item.code, item)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  cutting: propTypes.func.isRequired,
  addCart: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};

Item.defaultProps = {
  cutting: () => {},
  addCart: () => {},
  item: {},
};
export default React.memo(Item);
