import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import Comment from './comment';
import NewComment from './new-comment';
import SignIn from './sign-in';

function Comments(props) {
  const cn = bem('Comments');
  const [currentAnswer, setCurrentAnswer] = useState('');

  const callbacks = {
    // Добавить новый комментарий/ответ
    onSubmit: useCallback(text => {
      setCurrentAnswer('');
      props.sendComment(currentAnswer, text);
    }, [currentAnswer]),
    // Отменить ответ на комментарий
    cancel: useCallback(() => {
      setCurrentAnswer('');
    }, [])
  };

  return (
    <div className={cn()}>
      <p className={cn('title')}>{props.t('comments.title')} ({props.commentsCount})</p>
      {props.comments.map(comment =>
        <Comment
          key={comment.item._id}
          id={comment.item._id}
          user={comment.item.author.profile.name}
          date={comment.item.dateCreate}
          text={comment.item.text}
          setCurrentAnswer={setCurrentAnswer}
          locale={props.locale}
          level={comment.level}
          reply={props.t('comments.reply')}
        >
          {currentAnswer === comment.item._id && (props.session
            ? <NewComment
                title={props.t('comments.newAnswer')}
                placeholder={props.t('comments.text')}
                send={props.t('comments.send')}
                onSubmit={callbacks.onSubmit}
              >
                <button onClick={callbacks.cancel}>{props.t('comments.cancel')}</button>
              </NewComment>
            : <SignIn
                signIn={props.t('comments.signIn')}
                link="/login"
                pathname={props.pathname}
                text={props.t('comments.toAnswer')}
              >
                <button onClick={callbacks.cancel}>{props.t('comments.cancel')}</button>
              </SignIn>)
          }
        </Comment>
      )}
      {!currentAnswer && (props.session
        ? <NewComment
            title={props.t('comments.newComment')}
            placeholder={props.t('comments.text')}
            send={props.t('comments.send')}
            onSubmit={callbacks.onSubmit}
          />
        : <SignIn
            signIn={props.t('comments.signIn')}
            link="/login"
            pathname={props.pathname}
            text={props.t('comments.toComment')}
          />)
      }
    </div>
  );
}

Comments.propTypes = {
  session: PropTypes.bool.isRequired,
  comments: PropTypes.array,
  commentsCount: PropTypes.number,
  pathname: PropTypes.string,
  locale: PropTypes.string,
  sendComment: PropTypes.func,
  t: PropTypes.func
};

Comments.defaultProps = {
  session: PropTypes.bool,
  comments: [],
  commentsCount: 0,
  pathname: '/',
  locale: window.navigator.language,
  sendComment: () => {},
  t: (text) => text
};

export default React.memo(Comments);
