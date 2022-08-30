import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LeaveComment(props) {

  const cn = bem('LeaveComment');

  const [comment, setComment] = useState('');

  const callbacks = {
    onAddComment: useCallback((e) => {
      e.preventDefault();
      props.onAddComment(comment, props.id, props.isIdReply ? 'comment' : 'article')
    }, [props.onAddComment, comment])
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  return (
      <form className={cn()} onSubmit={callbacks.onAddComment}>
        <div className={cn('title')} >Новый {props.isIdReply ? 'ответ' : 'комментарий'}</div>
        <textarea type='text' value={comment} onChange={handleComment}/>
        <div className={cn('buttons')}>
          <button type='submit' className={cn('button-send')}>Отправить</button>
          {props.isIdReply && <button type='button' className={cn('button-cancel')} onClick={props.onCancelReply}>Отмена</button>}
        </div>
      </form>
  )
}

LeaveComment.propTypes = {
  onCancelReply: propTypes.func.isRequired,
  onAddComment: propTypes.func.isRequired,
  id: propTypes.string,
  isIdReply: propTypes.string
}

LeaveComment.defaultProps = {
  onCancelReply: () => {},
  onAddComment: () => {},
}

export default React.memo(LeaveComment);