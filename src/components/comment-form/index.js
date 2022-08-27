import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function CommentForm({title, sendText, cancelText, isDefault, onCancelClick, onSendClick, error, resetError, errorText}) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  return (
  <form className={!isDefault ? cn({padding: true}) : cn()} onSubmit={(evt) => {
    evt.preventDefault();
    if (text) onSendClick(text);
  }}>
    <h3 className={cn('title')}>{title}</h3>
    <textarea className={cn('textarea')}
              onChange={(evt) => {
                setText(evt.target.value);
                resetError();
              }}
              value={text}
              required></textarea>
    {error ? <div className={cn('error')}>{errorText}</div> : null}
    <button className={cn('send')} type="submit">{sendText}</button>
    {isDefault ? <button className={cn('cancel')} type="button" onClick={onCancelClick}>{cancelText}</button> : null}
  </form>
  )
}

CommentForm.propTypes = {
  title: propTypes.string.isRequired,
  sendText: propTypes.string.isRequired,
  cancelText: propTypes.string.isRequired,
  isDefault: propTypes.bool.isRequired,
  onCancelClick: propTypes.func.isRequired,
  onSendClick: propTypes.func.isRequired,
  error: propTypes.bool.isRequired,
  resetError: propTypes.func.isRequired,
  errorText: propTypes.string.isRequired,
}

export default React.memo(CommentForm);
