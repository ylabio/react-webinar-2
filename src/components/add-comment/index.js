import React, { useState, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function AddComment({ onAdd, onCancel, isAnswer, t }) {
  const cn = bem('AddComment');

  const [value, setValue] = useState('');

  const callbacks = {
    onAddCommentClick: useCallback(() => onAdd(value), [value]),
    onCancelClick: useCallback(() => onCancel(), []),
    onChange: useCallback((e) => setValue(e.target.value), []),
  };

  return (
    <div className={cn()}>
      <p className={cn('title')}>{`${t('comments.new')} ${isAnswer ? `${t('comments.answer')}` : `${t('comments.comment')}`}`}</p>
      <textarea className={cn('text')} value={value} onChange={callbacks.onChange} placeholder='Текст'/>
      <button className={cn('btn')} type='button' onClick={callbacks.onAddCommentClick}>{t('comments.send')}</button>
      {isAnswer && <button className={cn('btn')} type='button' onClick={callbacks.onCancelClick}>{t('comments.cancel')}</button>}
    </div>
  )
}

AddComment.propTypes = {
  isAnswer: propTypes.bool.isRequired,
  onAdd: propTypes.func,
  onCancel: propTypes.func,
  t: propTypes.func
}

AddComment.defaultProps = {
}

export default React.memo(AddComment);
