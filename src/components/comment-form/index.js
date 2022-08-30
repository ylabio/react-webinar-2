import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function CommentForm({ 
  type, 
  closeCB, 
  comment, 
  createResponse,
  productId,
 }) {
  const cn = bem('CommentForm');
  const [textarea, setTextarea] = useState('Текст');

  const callbacks = {
    formHandler: useCallback((e) => {
      e.preventDefault();

      if (type === 'answer') {
        createResponse(textarea, comment._id, comment._type);
        closeCB();
      }
  
      if (type === 'comment') {
        createResponse(textarea, productId, 'article');  
      }
    }, [textarea, comment._id, comment._type, productId])
  };

  return (
    <form className={cn()} onSubmit={callbacks.formHandler}> 
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
  productId: propTypes.string,
  comment: propTypes.object.isRequired,
  createResponse: propTypes.func.isRequired,
};

CommentForm.defaultProps = {
  closeCB: () => {},
  productId: '',
  comment: {},
};

export default React.memo(CommentForm);