import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function ListComment(props) {
  return (
    <>
      {props.items.map((item) => (
        <div key={item._id}>{props.renderItem(item)}</div>
      ))}
    </>
  );
}

ListComment.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func,
};

ListComment.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString();
  },
};

export default React.memo(ListComment);
