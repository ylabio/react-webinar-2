import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Protected from '../../containers/protected';
import Comment from '../comment';
import CommentsForm from '../comments-form';

function CommentsList(props) {
  const cn = bem('CommentsList');
  const [showForm, setShowForm] = React.useState(true);

  return (
    <>
      <div className={cn()}>
        <h2 className={cn('title')}>Комментарии ({props.comments.length})</h2>
        {props.comments?.length > 0
          ? props.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onSubmit={props.onSubmit}
                userName={props.userName}
                onRedirect={props.onRedirect}
                setShowMainForm={setShowForm}
              />
            ))
          : null}
      </div>
      {props.userName && showForm ? (
        <Protected redirect="/login">
          <CommentsForm
            userName={props.userName}
            id={props.id}
            type="article"
            label="Новый комментарий"
            onSubmit={props.onSubmit}
          />
        </Protected>
      ) : null}
      {!props.userName && showForm ? (
        <div className={cn('no-login')}>
          <button className={cn('button')} onClick={props.onRedirect}>
            Войдите
          </button>
          <p className={cn('text')}>, чтобы иметь возможноcть комментировать</p>
        </div>
      ) : null}
    </>
  );
}

export default React.memo(CommentsList);
