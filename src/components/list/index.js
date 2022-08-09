import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {!props.items.length && <h3>Пусто</h3>}
      {props.items.map((item) => (
        <div key={item.code} className={cn('item')}>
          {React.cloneElement(props.children, {
            item: item,
            onAddToCart: props.onItemAddToCart,
            onDeleteFromCart: props.onItemDeleteFromCart,
          })}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  children: propTypes.node,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemAddToCart: propTypes.func,
  onItemDeleteFromCart: propTypes.func,
};

List.defaultProps = {
  items: [],
  onItemAddToCart: () => {},
  onItemDeleteFromCart: () => {},
};

export default React.memo(List);
