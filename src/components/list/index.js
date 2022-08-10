import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {!props.items.length && <h4>В корзине нет товаров</h4>}
      {props.items.map((item) => (
        <div key={item.code} className={cn('item')}>
          {React.cloneElement(props.children, {
            item: item,
            
            onAddBucket: props.onItemAddBucket,
            onDeleteBucket: props.onItemDeleteBucket,
          })}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  children: propTypes.node,
  items: propTypes.arrayOf(propTypes.object).isRequired,

  onItemAddBucket: propTypes.func,
  onItemDeleteBucket: propTypes.func,
};

List.defaultProps = {
  items: [],

  onItemAddBucket: () => {},
  onItemDeleteBucket: () => {},
};

export default React.memo(List);
