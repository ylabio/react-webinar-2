import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormComment({ newReply, onCancel, onSend }) {
  const cn = bem('FormComment');
  const [body, setBody] = useState('');

  const title = newReply ? 'Новый ответ' : 'Новый комментарий';

  const onFormHandle = (e) => {
    e.preventDefault();
    body ? onSend(body) : null;
  };

  return (
    <form
      className={newReply ? cn() : cn({ padding: true })}
      onSubmit={onFormHandle}>
      <div className={cn('title')}>{title}</div>
      <textarea
        className={cn('textarea')}
        onChange={(e) => setBody(e.target.value)}
        value={body}
        required={true}></textarea>
      <button className={cn('controls', { right: true })} type='submit'>
        Отправить
      </button>
      {newReply && (
        <button className={cn('controls')} type='button' onClick={onCancel}>
          Отмена
        </button>
      )}
    </form>
  );
}

FormComment.propTypes = {
  newReply: propTypes.string.isRequired,
  onCancel: propTypes.func,
  onSend: propTypes.func,
};

FormComment.defaultProps = {
  onCancel: () => {},
  onSend: () => {},
};

export default React.memo(FormComment);
