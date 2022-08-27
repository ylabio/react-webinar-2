import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import {Link} from 'react-router-dom';
import NewCommentBlock from '../new-comment';

function CommentsBlock({
  exists,
  items,
  count,
  addComment,
  openAnswerBlock,
  answerState,
  onChange,
  signIn
}) {
  // CSS классы по БЭМ
  const cn = bem('CommentsBlock');

  return (
    <div className={cn()}>
      <div className={cn('header')}>{`Комментарии (${
        exists ? count : 0
      })`}</div>
      {exists ? (
        <>
          {items.map((item) => {
            return (
              <Comment
                key={item._id}
                item={item}
                answerState={answerState}
                setAnswerState={openAnswerBlock}
                addComment={addComment}
                onChange={onChange}
              />
            );
          })}
          {!answerState 
          && <NewCommentBlock 
          onChange={onChange}
          addComment={addComment} />}
        </>
      ) : (
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
  onChange: propTypes.func,
  signIn: propTypes.func,
};

CommentsBlock.defaultProps = {
  items: [],
};

export default React.memo(CommentsBlock);
