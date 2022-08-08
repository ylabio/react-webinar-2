import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item._id} className={cn('item')}>
        {props.renderItem(item)}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

List.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(List);
