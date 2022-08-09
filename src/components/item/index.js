import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);
  const itemPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(props.item.price);

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, [props.onSelect, props.item, setCount, count]),

    onDelete: useCallback(() => {
      props.onDelete(props.item.code, props.item.price);
    }, [props.onDelete, props.item]),
    onAddItem: useCallback(() => {
      props.onAddItem(props.item.code, props.item.title, props.item.price);
    }, [props.onAddItem, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
        <div>
          {`${itemPrice}`}
          <span style={{ marginLeft: '50px' }}>
            {props.item.count ? props.item.count + ' шт' : ''}
          </span>
        </div>
        {/* {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null} */}
      </div>
      <div className={cn('actions')}>
        <button
          onClick={() =>
            props.btnTitle === 'Удалить'
              ? callbacks.onDelete(props.item.code, props.item.price)
              : callbacks.onAddItem(props.item.code, props.item.title, props.item.price)
          }>
          {props.btnTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
  onAddItem: propTypes.func.isRequired,
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},
  onAddItem: () => {},
};

export default React.memo(Item);
