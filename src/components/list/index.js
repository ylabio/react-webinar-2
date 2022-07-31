import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, onItemSelect, onItemDelete}) {

  console.log('List');

  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onSelect={onItemSelect} onDelete={onItemDelete}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func
}

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {}
}

export default React.memo(List);
