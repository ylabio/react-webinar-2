import React, { useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import date from "../../utils/date";
import AddComment from "../add-comment";
import CannotAddComment from "../cannot-add-comment";
import './style.css';

function ItemComment({ isAnswer, numComment, exists, onAdd, i, comment, onAnswer, onCancel, t }) {
  const cn = bem('ItemComment');

  const callbacks = {
    onCancelClick: useCallback(() => onCancel(), []),
    onAnswerClick: useCallback(() => onAnswer(i), []),
  };

  const countAnswers = (comment.parent._tree.length - 1) * 30;

  return (
    <li style={{paddingLeft: `${countAnswers}px`}} className={cn()}>
      <div className={cn('data')}>
        <p className={cn('name')}>{comment.author.profile.name}</p>
        <p className={cn('date')}>{date(comment.dateCreate)}</p>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('btn')} type='button' onClick={callbacks.onAnswerClick}>{t('comments.toAnswer')}</button>
      {isAnswer && numComment === i && (exists ? 
        <AddComment 
          t={t}
          isAnswer={isAnswer}
          onAdd={onAdd}
          onCancel={callbacks.onCancelClick}
        /> : 
        <CannotAddComment 
          t={t}
          isAnswer={isAnswer}
          onCancel={callbacks.onCancelClick}
        />
      )}
    </li>
  )
}

ItemComment.propTypes = {
  numComment: propTypes.number.isRequired,
  i: propTypes.number.isRequired,
  exists: propTypes.bool.isRequired,
  isAnswer: propTypes.bool.isRequired,
  comment: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onAnswer: propTypes.func,
  onCancel: propTypes.func,
  t: propTypes.func
}

ItemComment.defaultProps = {
}

export default React.memo(ItemComment);
