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
      props.onAddComment(comment, props.id, props.reply === 'reply' ? 'comment' : 'article')
    }, [props.onAddComment, comment])
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  return (
      <form className={cn()} onSubmit={callbacks.onAddComment}>
        <div className={cn('title')} >Новый {props.reply === 'reply' ? 'ответ' : 'комментарий'}</div>
        <textarea type="text" value={comment} onChange={handleComment}/>
        <div className={cn('buttons')}>
          <button type="submit" className={cn('button-send')}>Отправить</button>
          {props.reply === 'reply' && <button className={cn('button-cancel')} onClick={props.onCancelReply}>Отмена</button>}
        </div>
      </form>
  )
}

LeaveComment.propTypes = {

}

LeaveComment.defaultProps = {

}

export default React.memo(LeaveComment);