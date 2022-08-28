import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item._id} className={cn('item')}>
        {props.renderItem(item)}
      </div>
    )}
    </div>
  )
}

CommentsList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

CommentsList.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(CommentsList);
