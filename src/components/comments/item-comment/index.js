import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemComment({ comment, onReply, children }) {
  const cn = bem('Comment');

  const paddingLeft = {
    paddingLeft: comment.indentation,
  };

  return (
    <div className={cn()}>
      <div style={paddingLeft}>
        <div className={cn('header')}>
          <span className={cn('user')}>{comment.author.profile.name}</span>
          <span className={cn('time')}>{comment.date}</span>
        </div>
        <div className={cn('text')}>{comment.text}</div>
        <button className={cn('button')} onClick={() => onReply(comment._id)}>
          Ответить
        </button>
        {children}
      </div>
    </div>
  );
}

ItemComment.propTypes = {
  comment: propTypes.object.isRequired,
  onReply: propTypes.func,
  children: propTypes.node,
};

ItemComment.defaultProps = {
  onReply: () => {},
};

export default React.memo(ItemComment);
