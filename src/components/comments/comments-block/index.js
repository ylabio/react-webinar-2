import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import NewCommentBlock from '../new-comment';

function CommentsBlock({
  exists,
  items,
  count,
  addComment,
  openAnswerBlock,
  answerState,
  signIn
}) {
  // CSS классы по БЭМ
  const cn = bem('CommentsBlock');

  const redirect = (
  <span>
    <span className={cn('link')} onClick={signIn}>Войдите,</span> чтобы иметь возможность
    ответить
  </span>)

  return (
    <div className={cn()}>
      <div className={cn('header')}>{`Комментарии (${count})`}</div>
        {items.map((item) => {
          return (
            <Comment
              key={item._id}
              item={item}
              answerState={answerState}
              setAnswerState={openAnswerBlock}
              addComment={addComment}
              redirect={redirect}
              isAuth={exists}
            />
          );
        })}
        {exists && !answerState 
        ? <NewCommentBlock addComment={addComment} /> 
        : (
        <span>
            <span className={cn('link')} onClick={signIn}>Войдите,</span> чтобы иметь возможность
            комментировать
          </span>
      )}
    </div>
  );
}

CommentsBlock.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  exists: propTypes.bool,
  count: propTypes.number,
  openAnswerBlock: propTypes.func,
  answerState: propTypes.string,
  addComment: propTypes.func,
  signIn: propTypes.func,
};

CommentsBlock.defaultProps = {
  items: [],
};

export default React.memo(CommentsBlock);
