import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import dateFormating from '../../utils/date-formatting';
import AnswerComment from '../comment-form/answer';

function Comment({ comment, level, ...props }) {
  const cn = bem('Comment');

  return (
    <div style={{ paddingLeft: level ? 30 : 0 }} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('name')}>{comment.author.profile?.name ? comment.author.profile.name : props.name}</div>
        <div className={cn('time')}>{dateFormating(comment.dateCreate)}</div>
      </div>
      <div className={cn('body')}>{comment.text}</div>
      <a className={cn('link')} onClick={() => props.setVisibleTextArea(comment._id)}>Ответить</a>
      {props.childrenComments.map(item =>
        <div key={item._id} className={cn('child')}>
          {props.renderItem(item, level + 1)}
        </div>
      )}
      {comment._id === props.visibleTextArea
        ? <AnswerComment
          exists={props.exists}
          parentId={comment._id}
          setVisibleTextArea={props.setVisibleTextArea}
          idArticle={props.idArticle}
          name={comment.author.profile.name}
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
  name: propTypes.string,
  idArticle: propTypes.string.isRequired,
  answerComment: propTypes.func,
  onSignIn: propTypes.func,
}

Comment.defaultProps = {
  name: '',
  answerComment: () => { },
  onSignIn: () => { },
}

export default React.memo(Comment)