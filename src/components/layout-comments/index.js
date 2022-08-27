import {cn as bem} from '@bem-react/classname';
import React from 'react';
import ProtectedCommentForm from '../../containers/protected-comment-form';
import Comment from '../comment';
import './style.css';

function LayoutComments({comments, total, formPlacement, articleId, onAnswerClick}) {
  const cn = bem('LayoutComments');
  return (
    <div className={cn()}>
      <h2 className={cn('head')}>Комментарии {`(${total})`}</h2>
      <div className={cn('body')}>
        {comments.map(comment => (
          <React.Fragment key={comment.data._id}>
            <Comment data={comment.data} level={comment.level} onAnswer={onAnswerClick} />
            {formPlacement === comment.data._id && (
              <ProtectedCommentForm level={comment.level} head={'Новый ответ'} isAnswer={true} />
            )}
          </React.Fragment>
        ))}
        {formPlacement === articleId && (
          <ProtectedCommentForm level={0} head={'Новый комментарий'} isAnswer={false} />
        )}
      </div>
    </div>
  );
}

export default React.memo(LayoutComments);
