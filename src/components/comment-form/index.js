import {cn as bem} from '@bem-react/classname';
import React from 'react';
import './style.css';

function CommentForm({head, onSubmit, level, isAnswer, onCancel}) {
  const cn = bem('CommentForm');

  return (
    <div style={{paddingLeft: `${level * 30}px`}} className={cn()}>
      <form onSubmit={onSubmit}>
        <div className={cn('label')}>{head}</div>
        <textarea id='comment' rows='4'></textarea>
        <div className={cn('buttons')}>
          <input type={'submit'} value={'Отправить'}></input>
          {isAnswer && <input type={'button'} onClick={onCancel} value={'Отмена'}></input>}
        </div>
      </form>
    </div>
  );
}

export default React.memo(CommentForm);
