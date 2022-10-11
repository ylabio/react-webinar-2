import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const AnswerCommentForm = ({
  t,
  exists,
  onPost,
  parentId,
  type,
  onCancel,
  onSignIn,
}) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onPost(text, parentId, type);
    setText('');
    onCancel();
  };

  const cn = bem('AnswerCommentForm');

  return (
    <>
      {exists ? (
        <form className={cn('')}>
          <label className={cn('label')}>
            <span>{t('answer.label')}</span>
            <textarea
              className={cn('textarea')}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className={cn('actions')}>
            <button type='submit' onClick={onSubmit}>
              {t('answer.send')}
            </button>
            <button onClick={onCancel}>{t('answer.cancel')}</button>
          </div>
        </form>
      ) : (
        <div className={cn('signing')}>
          <div className={cn('link')} onClick={onSignIn}>
            {t('newComment.signIn')}
          </div>
          <div>{`, ${t('newComment.text')}.`}</div>
          &nbsp;
          <div className={cn('cancel')} onClick={onCancel}>
            {t('answer.cancel')}
          </div>
        </div>
      )}
    </>
  );
};

AnswerCommentForm.propTypes = {
  t: propTypes.func,
  exists: propTypes.bool,
  onPost: propTypes.func,
  parentId: propTypes.string,
  type: propTypes.string,
  onCancel: propTypes.func,
  onSignIn: propTypes.func,
};

AnswerCommentForm.defaultProps = {
  t: (text) => text,
  exists: false,
};

export default React.memo(AnswerCommentForm);
