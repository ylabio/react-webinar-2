import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onSelect={props.onItemSelect} onDelete={props.onItemDelete}/>
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
