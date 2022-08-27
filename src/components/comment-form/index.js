import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function CommentForm({ type, closeCB, comment, createResponse }) {
  const cn = bem('CommentForm');
  const [textarea, setTextarea] = useState(comment?._id);

  function formHandler(e) {
    e.preventDefault();
    createResponse(textarea, comment._id, comment._type);
    closeCB();
  }

  return (
    <form className={cn()} onSubmit={formHandler}> 
      <label className={cn('label')}>
        <span className={cn('text')}>
          {type === 'comment' ? 'Новый комментарий' : 'Новый ответ'}
        </span>
        <textarea 
          className={cn('textarea')} 
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)} 
        />
      
      </label>

      <div className={cn('submitWrapper')}>
        <button 
          type='submit' 
          className={cn('submit')}
        >
          Отправить
        </button>

        {type === 'answer' && (
          <button 
            className={cn('cancel')}
            onClick={closeCB}
          >
            Отмена
          </button>
        )}
      </div>       
    </form>
  );
}

CommentForm.propTypes = {
  type: propTypes.string.isRequired,
  closeCB: propTypes.func,
};

CommentForm.defaultProps = {
  closeCB: () => {},
};

export default CommentForm;