import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CommentForm = ({ onSubmit, onClose }) => {
  const callbacks = {
    submit: useCallback(event => {
      event.preventDefault();
      onSubmit(event.currentTarget.text.value);
    }, []),
    close: useCallback(() => {
      onClose();
    }, []),
  };

  return (
    <form className='comment-form' onSubmit={callbacks.submit}>
      <b>Новый ответ</b>
      <textarea name="text" rows="5" />
      <input type="submit" />
      <input type="reset" value="Отмена" onClick={callbacks.close} />
    </form>
  )    
}

CommentForm.PropTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default React.memo(CommentForm);