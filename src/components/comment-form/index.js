import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function CommentForm({ type = 'comment'}) {
  const cn = bem('CommentForm');

  return (
    <form className={cn()}> 
      <label className={cn('label')}>
        <span className={cn('text')}>
          {type === 'comment' ? 'Новый комментарий' : 'Новый ответ'}
        </span>
        <textarea className={cn('textarea')}>
          Текст
        </textarea>
      </label>

      <div className={cn('submitWrapper')}>
        <button type='submit' className={cn('submit')}>Отправить</button>
        {type === 'answer' && (
          <button className={cn('cancel')}>Отменить</button>
        )}
      </div>       
    </form>
  );
}

export default CommentForm;