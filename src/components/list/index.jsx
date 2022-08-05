import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from './item';
import './style.css';

function List({ items }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item item={{ ...item, count: 5 }} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
};

List.defaultProps = {
  items: [],
};

export default React.memo(List);
