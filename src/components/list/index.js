import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map((item) =>
      <div key={item.code} className={cn('item')}>
				{React.cloneElement(props.children, {item: {...item}, onCallback: props.onCallbackItem})}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  onCallbackItem: propTypes.func,
	children: propTypes.node.isRequired
}

List.defaultProps = {
  items: [],
	onCallbackItem: () => {}
}

export default React.memo(List);
