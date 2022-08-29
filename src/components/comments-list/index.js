import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment-item';
import AnswerCommentForm from '../answer-comment-form';

const CommentsList = ({
  comments,
  t,
  onReply,
  parent,
  exists,
  onPost,
  userId,
  onCancel,
  onSignIn,
}) => {
  const cn = bem('CommentsList');

  return (
    <div className={cn()}>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          author={comment.author.profile.name}
          created={comment.dateCreate}
          text={comment.text}
          nestedLevel={comment.nestedLevel}
          id={comment._id}
          onReply={() => onReply(comment._id)}
          answerAction={t('comments.answer')}
        >
          {parent === comment._id && (
            <AnswerCommentForm
              exists={exists}
              onPost={onPost}
              t={t}
              userId={userId}
              parentId={comment._id}
              type={'comment'}
              onCancel={onCancel}
              onSignIn={onSignIn}
            />
          )}
        </Comment>
      ))}
    </div>
  );
};

CommentsList.propTypes = {
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  t: propTypes.func,
  onReply: propTypes.func,
  parent: propTypes.string,
  exists: propTypes.bool,
  onPost: propTypes.func,
  userId: propTypes.string,
  onCancel: propTypes.func,
  onSignIn: propTypes.func,
};

CommentsList.defaultProps = {
  t: (text) => text,
};

export default React.memo(CommentsList);
