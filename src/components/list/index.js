import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');
  return (
    <div className={cn()}>
      {props.items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item cutting={props.cutting} addCart={props.addCart} item={item} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  cutting: propTypes.function.isRequired,
  addCart: propTypes.function.isRequired,
};

List.defaultProps = {
  cutting: () => {},
  addCart: () => {},
};


export default React.memo(List);
