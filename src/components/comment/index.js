import React, {useCallback} from 'react'
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import dateFormat from '../../utils/date-format';
import './style.css'

function Comment(props) {
  const cn = bem("Comment")

  const callbacks = {
    onReply: useCallback(_ => props.onReply(props.item._id), [props.onReply, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('author')}>{props.item.author}</span> {" "}
        <span className={cn('date')}>{dateFormat(props.item.dateCreate)}</span>
      </div>
      <div className={cn('content')}>{props.item.text}</div>
      <button className={cn('replyBtn')} onClick={callbacks.onReply}>Ответить</button>
    </div>
  )
}

export default React.memo(Comment)

Comment.propTypes = {
  item: propTypes.object.isRequired,
  onReply: propTypes.func,
}

Comment.defaultProps = {
  onReply: () => {},
}