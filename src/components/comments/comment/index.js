import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import TextButton from '../../buttons/text-button';
import CommentAnswerBlock from '../comments-answer-block';
import formatDate from '../../../utils/format-date';

function Comment({
  item,
  setAnswerState,
  answerState,
  className,
  addComment
}) {
  // CSS классы по БЭМ
  const cn = bem('Comment');

  const nestedComments = (item.children || []).map((comment) => {
    return (
      <Comment
        key={comment._id}
        item={comment}
        answerState={answerState}
        setAnswerState={setAnswerState}
        addComment={addComment}
      />
    );
  });

  return (
    <>
      <section className={`${cn()} ${className}`}>
        <div className={cn('infoBlock')}>
          <span className={cn('userInfo')}>{item.author.profile.name}</span>
          <span className={cn('date')}>
            {formatDate(item.dateCreate)}
          </span>
        </div>
        <div className={cn('text')}>{item.text}</div>
        <TextButton onClick={() => setAnswerState(item._id)}>
          Ответить
        </TextButton>
        {answerState === item._id && (
          <CommentAnswerBlock
            cancel={() => setAnswerState(null)}
            send={addComment}
            parent={item}
          />
        )}
      </section>
      <section className={cn('answer')}>{nestedComments}</section>
    </>
  );
}

Comment.propTypes = {
  item: propTypes.object.isRequired,
  answerState: propTypes.func,
  setAnswerState: propTypes.func,
  answerState: propTypes.string,
};

Comment.defaultProps = {
};

export default React.memo(Comment);
