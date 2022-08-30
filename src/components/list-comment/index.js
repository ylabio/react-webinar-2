import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import ItemComment from "../item-comment";
import './style.css';

function ListComment({ sortComments, isAnswer, numComment, exists, onAdd, onAnswer, onCancel, t }) {
  const cn = bem('ListComment');

  return (
    <ul className={cn()}>
      {sortComments.map((comment, i) => (
        <ItemComment
          key={comment._id}
          comment={comment}
          i={i}
          numComment={numComment}
          isAnswer={isAnswer}
          exists={exists}
          t={t}
          onCancel={onCancel}
          onAnswer={onAnswer}
          onAdd={onAdd}
        />
      ))}
    </ul>
  )
}

ListComment.propTypes = {
  numComment: propTypes.array.isRequired,
  numComment: propTypes.number.isRequired,
  exists: propTypes.bool.isRequired,
  isAnswer: propTypes.bool.isRequired,
  onAdd: propTypes.func,
  onAnswer: propTypes.func,
  onCancel: propTypes.func,
  t: propTypes.func
}

ListComment.defaultProps = {
}

export default React.memo(ListComment);
