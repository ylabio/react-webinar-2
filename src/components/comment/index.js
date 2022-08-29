import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import {formatDate} from "../../utils/format-date";

function Comment(props) {

  // CSS классы по БЭМ
  const cn = bem('Comment');

  const [message, setMessage] = useState( true);

  useEffect(() => {
    if (props.comment.text.length > 1200) {
      setMessage(false);
    }
  }, [])

  const callbacks = {
    answerComment: useCallback(() => props.answerComment(props.comment._id), [props.comment.active]),
  };

  const checkUser = props.comment.author?._id === props.userId;

  return (
    // Отступ по вложенности
    <div className={cn()} style={{marginLeft: 30 * (props.comment.level <= 20 ? props.comment.level : 20) + 'px'}}>
      <div className={cn('head')}>
        <div className={cn('user-name', {'current': checkUser})}>{props.comment.author?.profile.name}</div>
        <div className={cn('date')}>{formatDate(props.comment?.dateCreate, props.t('lang'))}</div>
      </div>
      <div className={cn('text')}>
        {
          message
            ? <pre>{props.comment.text}</pre>
            : <pre>
                {props.comment.text.slice(0, 1200)}
                <span onClick={() => setMessage(true)}>. . .</span>
              </pre>
          }
      </div>
      <div className={cn('link')} onClick={callbacks.answerComment}>{props.t('comment.answer')}</div>
      {
        props.comment.active && props.rendersForm(props.comment._id)
      }
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  userId: propTypes.string,
  rendersForm: propTypes.func,
  answerComment: propTypes.func,
  t: propTypes.func,
}

Comment.defaultProps = {
  userId: '',
  rendersForm: () => {},
  answerComment: () => {},
  t: (text) => text,
}

export default React.memo(Comment);
