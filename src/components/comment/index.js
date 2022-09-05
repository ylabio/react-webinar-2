import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comment({comment, buttonText, onClick, children}) {
  const cn = bem('Comment');

  return (
  <div className={cn()}>
    <div className={cn('spacing')} style={{paddingLeft: comment.padding}}>
      <div className={cn('info')}>
        <span className={cn('user')}>{comment.author.profile.name}</span>
        <span className={cn('date')}>{comment.dateCreate}</span></div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} type="button" onClick={() => onClick(comment._id)}>{buttonText}</button>
      {children}
    </div>
  </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  buttonText: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  children: propTypes.node,
}

export default React.memo(Comment);
