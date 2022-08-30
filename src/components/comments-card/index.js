import React, { useCallback } from 'react';
import ListComments from '../list-comments';
import NewComment from '../comment-form/new-comment';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Comment from '../comment';
import AnswerComment from '../comment-form/answer';
import './style.css'

function CommentsCart(props) {
  const cn = bem('CommentsCart');

  const renders = {
    comment: useCallback((comment, level) => (
      <Comment
        comment={comment}
        level={level}
        setVisibleTextArea={props.setVisibleTextArea}
        visibleTextArea={props.visibleTextArea}
        renderItem={renders.comment}
        renderForm={renders.answerForm}
        name={props.name}
      />
    ), [props.visibleTextArea, props.name]),
    answerForm: useCallback((parentId, name) => (
      <AnswerComment
        exists={props.exists}
        parentId={parentId}
        setVisibleTextArea={props.setVisibleTextArea}
        idArticle={props.idArticle}
        name={name}
        onSignIn={props.onSignIn}
        answerComment={props.answerComment}
      />
    ), [props.exists])
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({props.count})</h2>
      <ListComments
        items={props.items}
        renderItem={renders.comment}
        count={props.count} />
      {props.idArticle === props.visibleTextArea
        ? <NewComment exists={props.exists} newComment={props.newComment} onSignIn={props.onSignIn} />
        : null
      }
    </div>
  )
}

CommentsCart.propTypes = {
  setVisibleTextArea: propTypes.func.isRequired,
  visibleTextArea: propTypes.string,
  idArticle: propTypes.string,
  items: propTypes.arrayOf(propTypes.object),
  count: propTypes.number,
  exists: propTypes.bool,
  newComment: propTypes.func,
  answerComment: propTypes.func,
  onSignIn: propTypes.func,
  name: propTypes.string
}

CommentsCart.defaultProps = {
  items: [],
  count: 0,
  exists: false,
  idArticle: '',
  visibleTextArea: '',
  name: '',
  newComment: () => { },
  answerComment: () => { },
  onSignIn: () => { },
}

export default React.memo(CommentsCart)