import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.items.map((item, index) => (
        <div key={item.code} className={cn('item')}>
          <Item
            num={index + 1}
            item={item}
            onAddBucket={props.onItemAddBucket}
            onDeleteBucket={props.onItemDeleteBucket}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  onItemAddBucket: propTypes.func,
  onItemDeleteBucket: propTypes.func,
};

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {},
  onItemAddBucket: () => {},
  onItemDeleteBucket: () => {},
};

export default React.memo(List);
