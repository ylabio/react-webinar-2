import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React, {useCallback} from 'react';
import './style.css';

function CommentForm({text, onSubmit, level, isAnswer, onCancel, onEdit, commentText}) {
  const cn = bem('CommentForm');

  const callbacks = {
    onSubmit: useCallback(
      e => {
        e.preventDefault();
        onSubmit(commentText);
      },
      [commentText]
    ),

    onEdit: useCallback(e => {
      onEdit(e.target.value);
    }, [])
  };
  return (
    <div style={{paddingLeft: `${level * 30}px`}} className={cn()}>
      <form onSubmit={callbacks.onSubmit}>
        <div className={cn('label')}>{text.head}</div>
        <textarea value={commentText} onChange={callbacks.onEdit} id='comment' rows='4'></textarea>
        <div className={cn('buttons')}>
          <input type={'submit'} value={text.send}></input>
          {isAnswer && <input type={'button'} onClick={onCancel} value={text.cancel}></input>}
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  text: propTypes.objectOf(propTypes.string),
  level: propTypes.number,
  isAnswer: propTypes.bool,
  commentText: propTypes.string,
  onCancel: propTypes.func,
  onEdit: propTypes.func,
  onSubmit: propTypes.func
};

export default React.memo(CommentForm);
