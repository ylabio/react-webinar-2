import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const CommentsList = ({ items, render }) => {
  return (
    <ul className='comments-list'>
      {items.map(item => 
        <li key={item._id} className='comments-list__item' style={
          item.depth ? { 'paddingLeft': `${item.depth * 30}px` } : null
        }>
          {render(item)}
        </li>
      )}
    </ul>
  )
};

CommentsList.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  render: propTypes.func.isRequired,
};

export default React.memo(CommentsList);