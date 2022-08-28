import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Comment = ({ text, author, created, answerAction }) => {
  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('row')}>
        <div className={cn('author')}>{author}</div>
        <div className={cn('created')}>{created}</div>
      </div>
      <div className={cn('row')}>
        <div className={cn('content')}>{text}</div>
      </div>
      <div className={cn('row')}>
        <button className={cn('actions')}>{answerAction}</button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  text: propTypes.string,
  author: propTypes.string,
  created: propTypes.string,
  answerAction: propTypes.string,
};

Comment.defaultProps = {};

export default React.memo(Comment);
