import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const NewCommentForm = ({ t, exists, onPost, parentId, type, onSignIn }) => {
  const cn = bem('NewCommentForm');

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onPost(text, parentId, type);
    setText('');
  };

  return (
    <>
      {exists ? (
        <form className={cn('')}>
          <label className={cn('label')}>
            <span>{t('newComment.label')}</span>
            <textarea
              className={cn('textarea')}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className={cn('actions')}>
            <button onClick={onSubmit}>{t('newComment.action')}</button>
          </div>
        </form>
      ) : (
        <div className={cn('signing')}>
          <div className={cn('link')} onClick={onSignIn}>
            {t('newComment.signIn')}
          </div>
          <div>{`, ${t('newComment.text')}`}</div>
        </div>
      )}
    </>
  );
};

NewCommentForm.propTypes = {
  t: propTypes.func,
  exists: propTypes.bool,
  onPost: propTypes.func,
  parentId: propTypes.string,
  type: propTypes.string,
  onSignIn: propTypes.func,
};

NewCommentForm.defaultProps = {
  t: (text) => text,
};

export default React.memo(NewCommentForm);
