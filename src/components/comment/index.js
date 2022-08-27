import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comment(props) {

  // CSS классы по БЭМ
  const cn = bem('Comment');

  // Отступ по вложенности
  const styleMargin = {
    marginLeft: 30 * props.comment.level + 'px'
  }

  const callbacks = {
    answerComment: useCallback(() => props.answerComment(props.comment._id), [props.comment.active]),
    onHide: useCallback(() => props.onHide(props.comment._id), [props.comment.hide]),
  };

  const date = new Date(props.comment?.dateCreate);
  const newDate = props.t('lang') === 'ru'
    ? date.toLocaleString('ru',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).replace('г.,', 'в')
    : date.toLocaleString('en',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });

  const checkUser = props.comment.author?._id === props.userId;

  return (
    <div className={cn()} style={styleMargin}>
      <div className={cn('head')}>
        <div className={cn('user-name', {'current': checkUser})}>{props.comment.author?.profile.name}</div>
        <div className={cn('date')}>{newDate}</div>
      </div>
      {
        props.comment.hide
          ? <>
              <div className={cn('text')}>
                {props.comment.text}
              </div>
              <div className={cn('link')} onClick={callbacks.answerComment}>{props.t('comment.answer')}</div>
            </>
          : <div className={cn('hide')} onClick={callbacks.onHide}>. . .</div>
      }
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
  onHide: propTypes.func,
  t: propTypes.func,
}

Comment.defaultProps = {
  userId: '',
  rendersForm: () => {},
  answerComment: () => {},
  onHide: () => {},
  t: (text) => text,
}

export default React.memo(Comment);
