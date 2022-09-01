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
  addComment,
  redirect,
  isAuth,
  userName
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
        redirect={redirect}
        isAuth={isAuth}
        userName={userName}
      />
    );
  });

  return (
    <>
      <section className={`${cn()} ${className}`}>
        <div className={cn('infoBlock')}>
          {/* //TODO прописать в новом комменте автора */}
          <span className={cn('userInfo')}>{item.author.profile.name || userName}</span>
          <span className={cn('date')}>
            {formatDate(item.dateCreate)}
          </span>
        </div>
        <div className={cn('text')}>{item.text}</div>
        <TextButton onClick={() => setAnswerState(item._id)}>
          Ответить
        </TextButton>
        {answerState === item._id 
        ? !isAuth 
        ? <>{redirect}</>
        : <CommentAnswerBlock
            cancel={() => setAnswerState(null)}
            send={addComment}
            parent={item}
            userName={userName}
          />
        : null}
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
