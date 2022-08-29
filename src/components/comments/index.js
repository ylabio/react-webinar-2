import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from '../../components/comments-item';
import CommentForm from '../../components/comments-form';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const Comments = (
  {
    comments,
    articleId,
    parentId,
    send,
    close,
    open,
    logged,
    login,
  }) => {
  const cn = bem('comments');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{`Комментарии (${comments.length})`}</div>

      <ul className={cn('list')}>
        {comments.map(item =>
          <li key={item._id} className={cn('listItem')} style={
            {'marginLeft': `${item.depth * 30}px`,}
          }>
            <CommentItem data={item} onReply={open}/>

            {item._id === parentId && (logged
                ? <CommentForm onSubmit={send} onClose={close}/>
                : <div className={cn('lockedReply')}>
                  <span className={cn('login')} onClick={login}>Войдите</span>, чтобы иметь возможность ответить.
                  <span
                    className={cn('cancel')}
                    onClick={close}
                  >
                    Отмена
                  </span>
                </div>
            )}
          </li>
        )}
      </ul>

      {articleId === parentId && logged && <CommentForm onSubmit={send} onClose={close}/>}
      {articleId !== parentId && logged && <button onClick={() => open(articleId)}>Комментировать</button>}
      {!logged &&
        <div><span className={cn('login')} onClick={login}>Войдите</span>, чтобы иметь возможность комментировать</div>}
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array,
  parentId: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
  send: PropTypes.func,
};

export default React.memo(Comments);