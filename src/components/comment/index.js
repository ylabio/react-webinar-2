import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import dateFormating from '../../utils/date-formatting';
import AnswerComment from '../comment-form/answer';

function Comment({ comment, level, ...props }) {
  const cn = bem('Comment');

  return (
    <div style={{ paddingLeft: level * 25 }} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('name')}>{comment.name}</div>
        <div className={cn('time')}>{dateFormating(comment.dateCreate)}</div>
      </div>
      <div className={cn('body')}>{comment.text}</div>
      <a className={cn('link')} onClick={() => props.setVisibleTextArea(comment.id)}>Ответить</a>
      {comment.id === props.visibleTextArea
        ? <AnswerComment
          exists={props.exists}
          parentId={comment.id}
          setVisibleTextArea={props.setVisibleTextArea}
          idArticle={props.idArticle}
          name={comment.name}
          onSignIn={props.onSignIn}
          answerComment={props.answerComment}
        />
        : null
      }
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  level: propTypes.number.isRequired,
  exists: propTypes.bool.isRequired,
  setVisibleTextArea: propTypes.func.isRequired,
  visibleTextArea: propTypes.string.isRequired,
  idArticle: propTypes.string.isRequired,
  answerComment: propTypes.func,
  onSignIn: propTypes.func,
}

Comment.defaultProps = {
  answerComment: () => { },
  onSignIn: () => { },
}

export default React.memo(Comment)