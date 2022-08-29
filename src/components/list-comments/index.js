import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ListComments(props) {
  const cn = bem('ListComments');

  return (
    <div style={props.id?props.style:null} className={cn()}>{props.items.map(item =>
      <div key={item._id} className={cn('item')}>
        {props.renderItem(item)}
      </div>
    )}
    </div>
  )
}

ListComments.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

ListComments.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(ListComments);
