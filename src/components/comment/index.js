import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import { transformDate } from '../../utils/transform-date';
import { withReply } from '../../hoc/with-reply';

function Comment({ comment }) {

  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <span className={cn('user-name')}>{comment.author.profile.name}</span>
        <span className={cn('date')}>{transformDate(comment.dateCreate, 'ru')}</span>
      </div>
      <div className={cn('text')}>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object,
  margin: propTypes.number,
}

export default React.memo(withReply(Comment));
