import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CommentForm = ({ onSubmit, onClose }) => {
  const [text, setText] = useState('');

  const handleText = (e) => setText(e.target.value);

  const trimText = () => setText(text.trim()); // срабатывает и перед отправкой

  const callbacks = {
    submit: useCallback(event => {
      event.preventDefault();
      onSubmit(text);
    }, [text]),
  };

  return (
    <form className='comment-form' onSubmit={callbacks.submit}>
      <b>Новый ответ</b>
      <textarea name="text" rows="5" onChange={handleText} value={text} onBlur={trimText} />
      <input type="submit" disabled={!text.trim().length} />
      <input type="reset" value="Отмена" onClick={onClose} />
    </form>
  )    
}

CommentForm.PropTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default React.memo(CommentForm);