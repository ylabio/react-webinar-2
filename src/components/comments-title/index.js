import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

const CommentsTitle = ({ title, count }) => {
  const cn = bem('CommentsTitle');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{`${title} (${count})`}</div>
    </div>
  );
};

CommentsTitle.propTypes = {
  title: propTypes.string,
  count: propTypes.number,
};

CommentsTitle.defaultProps = {
  count: 0,
};

export default CommentsTitle;
