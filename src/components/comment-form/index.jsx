import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
import './style.css';

const CommentForm = ({ onSubmit, onClose, sending }) => {
  const callbacks = {
    submit: useCallback(event => {
      event.preventDefault();
      onSubmit(event.currentTarget.text.value);
    }, []),
  };

  return (
    <Spinner active={sending}>
      <form className='comment-form' onSubmit={callbacks.submit}>
        <b>Новый ответ</b>
        <textarea name="text" rows="5" />
        <input type="submit" />
        <input type="reset" value="Отмена" onClick={onClose} />
      </form>
    </Spinner>
  )    
}

CommentForm.PropTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  sending: PropTypes.bool,
};

export default React.memo(CommentForm);