import React, { useState, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import AddComment from "../add-comment";
import CannotAddComment from "../cannot-add-comment";
import ListComment from "../list-comment";
import './style.css';

function Comments({ comments, count, exists, paramsId, onAdd, t }) {
  const cn = bem('Comments');

  const [isAnswer, setAnswer] = useState(false);
  const [numComment, setNumComment] = useState(-1);

  const callbacks = {
    onAddCommentClick: useCallback((value) => onAdd(
      {
        parent: {
          _id: `${isAnswer ? sortComments[numComment]._id : paramsId}`,
          _type: `${isAnswer ? 'comment' : 'article'}`
        },
        text: value
      }
    ), [isAnswer]),
    onCancelClick: useCallback(() => setAnswer(false), []),
    onAnswerClick: useCallback((i) => {
      setAnswer(true);
      setNumComment(i);
    }, []),
  };

  const sortComments = [];

  comments.map((comment) => {
    for (let i = 0; i < sortComments.length; i++) {
      if (comment.parent._id === sortComments[i]._id) return sortComments.splice(i + 1, 0, comment)
    }
    return sortComments.push(comment)
  })
	
  return (
    <div className={cn()}>
      <p className={cn('title')}>{`${t('comments.comment')} (${count})`}</p>
        <ListComment
          sortComments={sortComments}
          numComment={numComment}
          isAnswer={isAnswer}
          exists={exists}
          t={t}
          onCancel={callbacks.onCancelClick}
          onAnswer={callbacks.onAnswerClick}
          onAdd={callbacks.onAddCommentClick}
        />
      {!isAnswer && (exists ? 
        <AddComment
          t={t}
          isAnswer={isAnswer}
          onAdd={callbacks.onAddCommentClick}
          onCancel={callbacks.onCancelClick}
        /> : 
        <CannotAddComment 
          t={t}
          isAnswer={isAnswer}
          onCancel={callbacks.onCancelClick}
        />
      )}
    </div>
  )
}

Comments.propTypes = {
  comments: propTypes.array.isRequired,
  count: propTypes.number.isRequired,
  exists: propTypes.bool.isRequired,
  paramsId: propTypes.string.isRequired,
  onAdd: propTypes.func,
  t: propTypes.func
}

Comments.defaultProps = {
}

export default React.memo(Comments);
