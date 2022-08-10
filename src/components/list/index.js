import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, callback, render}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map(item =>
        <div key={item.code} className={cn('item')}>
          {/* Используем рендер-проп */}  
          {render(item, callback)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callback: propTypes.func.isRequired,
  render: propTypes.func.isRequired,
}

export default React.memo(List);
