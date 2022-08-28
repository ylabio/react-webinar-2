import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment-item';

const CommentsList = ({ comments, t }) => {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          author={comment.author.profile.name}
          created={comment.dateCreate}
          text={comment.text}
          answerAction={t('comments.answer')}
        />
      ))}
    </div>
  );
};

CommentsList.propTypes = {
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  t: propTypes.func,
};

CommentsList.defaultProps = {
  t: (text) => text,
};

export default React.memo(CommentsList);
