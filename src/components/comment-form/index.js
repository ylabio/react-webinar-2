import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function CommentForm({title, sendText, cancelText, isDefault, onCancelClick, onSendClick}) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  return (
  <form className={!isDefault ? cn({padding: true}) : cn()} onSubmit={(evt) => {
    evt.preventDefault();
    if (text) onSendClick(text);
  }}>
    <h3 className={cn('title')}>{title}</h3>
    <textarea className={cn('textarea')}
              onChange={(evt) => setText(evt.target.value)}
              value={text}
              required></textarea>
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
}

export default React.memo(CommentForm);
