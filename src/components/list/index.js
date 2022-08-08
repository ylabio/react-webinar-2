import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, onButtonClick, getItem}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        {getItem({item, onButtonClick})}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onButtonClick: propTypes.func,
  getItem: propTypes.func.isRequired
}

List.defaultProps = {
  onButtonClick: () => {}
}


export default React.memo(List);
