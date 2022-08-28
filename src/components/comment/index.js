import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentsForm from '../comments-form';

function Comment({ comment, onRedirect, onSubmit, userName, setShowMainForm }) {
  const [showForm, setShowForm] = React.useState(false);

  const cn = bem('Comment');

  const onShowForm = () => {
    setShowMainForm(false);
    setShowForm(true);
  };

  const onHIdeForm = () => {
    setShowMainForm(true);
    setShowForm(false);
  };

  return (
    <div className={cn()} style={{ marginLeft: comment.marginLeft || 0 }}>
      <div className={cn('title')}>
        <h3 className={cn('username')}>{comment.author ? comment.author : userName}</h3>
        <p className={cn('time')}>{`${new Date(comment.date).toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })} в ${new Date(comment.date).toLocaleString('ru', {
          hour: 'numeric',
          minute: 'numeric',
        })}`}</p>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('button')} onClick={onShowForm}>
        Ответить
      </button>
      {showForm && !userName ? (
        <div className={cn('no-login')}>
          <button className={cn('no-login-button')} onClick={onRedirect}>
            Войдите
          </button>
          <p className={cn('no-login-text')}>, чтобы иметь возможноcть ответить. </p>
          <button className={cn('button-close')} type="button" onClick={onHIdeForm}>
            Отмена
          </button>
        </div>
      ) : null}
      {showForm && userName ? (
        <CommentsForm id={comment.id} type="comment" onClose={onHIdeForm} label="Новый ответ" onSubmit={onSubmit} />
      ) : null}
    </div>
  );
}

export default React.memo(Comment);
