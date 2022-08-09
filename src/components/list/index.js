import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, itemForRender}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        {itemForRender(item)}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  itemForRender: propTypes.func.isRequired
}

List.defaultProps = {
  items: [],
  itemForRender: (item) => {
    return item.toString()
  }
}

export default React.memo(List);
