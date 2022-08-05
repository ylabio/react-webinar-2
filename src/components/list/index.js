import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ items, mainBtn, btnText }) {
  const cn = bem('List');
  const key = Math.random();

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={`${key} ${item.code}`} className={cn('item')}>
          <Item item={item} mainBtn={mainBtn} btnText={btnText} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  mainBtn: propTypes.func,
  btnText: propTypes.string,
};

List.defaultProps = {
  items: [],
  mainBtn: () => {},
  btnText: 'Добавить',
};

export default React.memo(List);
