import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const CommentsLayout = ({ error, title, children }) => {
  return error ? (
    <div className='comments'>
      <h2>Ошибка при загрузке комментариев</h2>
    </div>
  ) : (
    <div className='comments'>
      <h2>{title}</h2>
      {children}
    </div>
  )
};

CommentsLayout.propTypes = {
  error: propTypes.bool,
  title: propTypes.string,
  children: propTypes.node,
};

CommentsLayout.defaultProps = {
  error: false,
  title: 'Комментарии',
};

export default React.memo(CommentsLayout);