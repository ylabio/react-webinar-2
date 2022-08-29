import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/format-date';

const Comment = ({
  text,
  author,
  created,
  answerAction,
  nestedLevel,
  onReply,
  children,
}) => {
  const cn = bem('Comment');

  const nesting = () =>
    30 * nestedLevel < 600
      ? { paddingLeft: 30 * nestedLevel }
      : { paddingLeft: '50%' };

  return (
    <div className={cn()} style={nesting()}>
      <div className={cn('row')}>
        <div className={cn('author')}>{author}</div>
        <div className={cn('created')}>{formatDate(created)}</div>
      </div>
      <div className={cn('row')}>
        <div className={cn('content')}>{text}</div>
      </div>
      <div className={cn('row')}>
        <button className={cn('actions')} onClick={onReply}>
          {answerAction}
        </button>
      </div>
      {children}
    </div>
  );
};

Comment.propTypes = {
  text: propTypes.string,
  author: propTypes.string,
  created: propTypes.string,
  answerAction: propTypes.string,
  nestedLevel: propTypes.number,
  onReply: propTypes.func,
};

Comment.defaultProps = {};

export default React.memo(Comment);
