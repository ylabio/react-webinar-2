import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import CommentForm from "../comment-form";
import {useParams} from "react-router-dom";

function CommentsList({
                        commentsCount,
                        comments,
                        itemComment,
                        currentAnswer,
                        resetCurrentForm,
                        postNewComment,
                        redirect,
                        sessionExists,
                        t
                      }) {
  const cn = bem('CommentsList');
  
  const params = useParams()
  
  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {t('comments.comments')} ({commentsCount})
      </div>
      <div className={cn('list')}>
        <div className={cn('list')}>
          {comments.map((item, index) =>
            itemComment(item, index)
          )}
        </div>
        {/* Отображение формы для добавления комментария отображается по умолчанию, и, если выбрано комментирование товара(а не другого комментария) */}
        {currentAnswer === params.id &&
          <CommentForm
            t={t}
            currentAnswer={currentAnswer}
            resetCurrentForm={resetCurrentForm}
            postNewComment={postNewComment}
            redirect={redirect}
            sessionExists={sessionExists}
          />}
      </div>
    </div>
  )
}

CommentsList.propTypes = {
  commentsCount: propTypes.number,
  comments: propTypes.arrayOf(propTypes.object),
  itemComment: propTypes.func,
  currentAnswer: propTypes.string,
  resetCurrentForm: propTypes.func,
  postNewComment: propTypes.func,
  redirect: propTypes.func,
  sessionExists: propTypes.bool
}

CommentsList.defaultProps = {
  resetCurrentForm: () => {},
  postNewComment: () => {},
  redirect: () => {},
}

export default React.memo(CommentsList);
