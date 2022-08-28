import React, {useCallback, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function NewComment({isAuth, sendComment, parentId, isNewComment, cancelReply, signIn, t}) {

  // CSS классы по БЭМ
  const cn = bem('NewComment');

  //Состояние поля ввода комментария или ответа
  const [commentText, setCommentText] = useState('');

  const callbacks = {
    // Отправить комментарий или ответ на комментарий
    sendComment: useCallback((e) => {
      e.preventDefault();
      sendComment(commentText, parentId, isNewComment ? 'article' : 'comment');
      cancelReply();
    }, [commentText])
  }

  return (
    <div className={cn('content')}>
      {!isAuth
        // Если пользователь не авторизован, предлагаем ему авторизоваться
        ? <div className={cn('auth-false')}>
          <span className={cn('sign-in')} onClick={signIn}>{t('comment.signIn')}</span>
          <span>{t('comment.message')} {isNewComment ? t('comment.toComment') : t('comment.toAnswer')}</span>
          {!isNewComment && <span className={cn('cancel')} onClick={cancelReply}>{t('comment.cancel')}</span>}
        </div>
        // Если пользователь авторизован, предлагаем ему отправить комментарий либо ответ на комментарий
        : <div className={cn('auth-true')}>
          <h5 className={cn('title')}>{isNewComment ? t('comment.newComment') : t('comment.newAnswer')}</h5>
          <textarea className={cn('textarea')}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}/>
          <div className={cn('buttons')}>
            <button className={cn('send')} onClick={callbacks.sendComment}>{t('comment.send')}</button>
            {!isNewComment && <button className={cn('cancel')} onClick={cancelReply}>{t('comment.cancel')}</button>}
          </div>
        </div>
      }
    </div>
  );
}

NewComment.propTypes = {
  isAuth: propTypes.bool,
  sendComment: propTypes.func,
  parentId: propTypes.string,
  isNewComment: propTypes.bool,
  cancelReply: propTypes.func,
  signIn: propTypes.func,
  t: propTypes.func
}

NewComment.defaultProps = {
  isAuth: false,
  sendComment: () => {},
  parentId: '',
  isNewComment: true,
  cancelReply: () => {},
  signIn: () => {},
  t: (text) => text
}

export default React.memo(NewComment);
