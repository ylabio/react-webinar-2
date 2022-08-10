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
          onPush={props.onItemPush}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemPush: propTypes.func.isRequired
}

List.defaultProps = {
  propTypes: [],
  items: [],
  onItemPush: () => {},
}

export default React.memo(List);
