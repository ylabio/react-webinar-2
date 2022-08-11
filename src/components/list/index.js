import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ items, buttonTitle, onClick }) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {items.map((item, index) =>
        <li key={item.code} className={cn('item')}>
          <Item
            item={item}
            index={index}
            buttonTitle={buttonTitle}
            onClick={onClick}
          />
        </li>
      )}
    </ul>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonTitle: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

export default React.memo(List);
