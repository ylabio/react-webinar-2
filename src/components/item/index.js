import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, mainBtn, btnText }) {
  const cn = bem('Item');

  const callbacks = {
    mainBtn: useCallback(
      (e) => {
        e.stopPropagation();
        mainBtn(item.code);
      },
      [mainBtn, item],
    ),
  };

  return (
    <div className={cn({ selected: item.selected })}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>
        <span>{`${item.price.toLocaleString('ru')} ₽`}</span>
      </div>
      <div className={cn('actions')}>
        {item.count > 0 && <div className={cn('count')}>{`${item.count} шт.`}</div>}
        <button onClick={callbacks.mainBtn}>{btnText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  mainBtn: propTypes.func,
  btnText: propTypes.string,
};

Item.defaultProps = {
  mainBtn: () => {},
  btnText: 'Добавить',
};

export default React.memo(Item);
