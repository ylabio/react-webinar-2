import React, { forwardRef, useEffect } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import { transformDate } from '../../utils/transform-date';
import { withReply } from '../../hoc/with-reply';

const Comment = forwardRef((props, ref) => {

  const cn = bem('Comment');

  useEffect(() =>{
    if(props.newCommentId === props.comment._id) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className={cn()} ref={ref}>
      <div className={cn('head')}>
        <span className={cn('user-name')}>{props.comment.author.profile.name}</span>
        <span className={cn('date')}>{transformDate(props.comment.dateCreate, 'ru')}</span>
      </div>
      <div className={cn('text')}>
        <p>{props.comment.text}</p>
      </div>
    </div>
  )
})

Comment.propTypes = {
  comment: propTypes.object,
  margin: propTypes.number,
}

export default React.memo(withReply(Comment));
