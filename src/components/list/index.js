import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} elemIndex={index} onCallback={props.onCallbackItem}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  onCallbackItem: propTypes.func
}

List.defaultProps = {
  items: [],
	onCallbackItem: () => {}
}

export default React.memo(List);
