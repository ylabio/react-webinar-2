import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import './style.css';

function CommentForm({
  comments,
  lang,
  t,
  commentId,
  users,
  profile,
  articleId,
  onSubmit,
  parent,
}) {
  const cn = bem('Comment-Form');

  const [showForm, setShowForm] = useState(false);

  const [text, setText] = useState('');

  return (
    <form
      className={cn()}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(parent);
        onSubmit({ text, parent: { _id: parent._id, _type: parent._type } });
      }}>
      <label className={cn('Label')}>
        {commentId ? t('comment.newreply') : t('comment.newcomment')}
      </label>
      <textarea
        type='text'
        className={cn('Input')}
        id='new-comment-text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit'>{t('comment.send')}</button>
    </form>
  );
}

CommentForm.propTypes = {
  //   comments: propTypes.array.isRequired,
  t: propTypes.func.isRequired,
  commentId: propTypes.string,
  articleId: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  //   lang: propTypes.string.isRequired,
  //   users: propTypes.array.isRequired,
};

CommentForm.defaultProps = {
  commentId: '',
};

export default React.memo(CommentForm);
