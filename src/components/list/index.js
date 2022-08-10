import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, buttonName, onItemClick}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          item={item}
          buttonName={buttonName}
          onItemClick={onItemClick}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
}

export default React.memo(List);
