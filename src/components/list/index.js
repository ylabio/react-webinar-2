import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items && props.items.map(item =>
      
      <div key={item.code} className={cn('item')}>
        <Item 
          item={item} 
          onToggle={props.onToggle}
          onSelect={props.onItemSelect} 
          onDelete={props.onItemDelete} 
          onPush={props.onItemPush}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  onItemPush: propTypes.func
}

List.defaultProps = {
  propTypes: [],
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {},
  onItemPush: () => {}
}

export default React.memo(List);
