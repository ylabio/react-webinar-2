import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');
  const { items, onItemSelect, onItemDelete, inCart } = props;

  return (
    <div className={cn()}>
      {items.map((item, index) => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} onSelect={onItemSelect} onDelete={onItemDelete} inCart={inCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  inCart: propTypes.bool,
};

List.defaultProps = {
  onItemSelect: () => {},
  onItemDelete: () => {},
  inCart: false,
};

export default React.memo(List);
