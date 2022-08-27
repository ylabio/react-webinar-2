import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CannotAddComment({ onCancel, isAnswer, t }) {
  const cn = bem('CannotAddComment');

  const callbacks = {
    onCancelClick: useCallback(() => onCancel(), []),
  };

  return (
    <div className={cn()}>
      <p className={cn('signIn')}>
        <Link className={cn('link', {color: 'blue'})} to='/login'>{t('comments.login')}</Link>
        {`, ${t('comments.text')} ${isAnswer ? `${t('comments.toAnswer')}.` : `${t('comments.toComment')}`}`}
      </p>
      {isAnswer && <button className={cn('link', {color: 'gray'})} type='button' onClick={callbacks.onCancelClick}>{t('comments.cancel')}</button>}
    </div>
  )
}

CannotAddComment.propTypes = {
  isAnswer: propTypes.bool.isRequired,
  onCancel: propTypes.func,
  t: propTypes.func
}

CannotAddComment.defaultProps = {
}

export default React.memo(CannotAddComment);
