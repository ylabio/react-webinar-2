import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Comment({data, level, onAnswer, text, scrollRef}) {
  const cn = bem('Comment');

  const callbacks = {
    onAnswer: () => onAnswer(data._id)
  };

  return (
    <div ref={scrollRef} className={`${cn()} comment-inset_${level > 10 ? 10 : level}`}>
      <div className={cn('head')}>
        <div className={cn('author')}>{data.author}</div>
        <div className={cn('createdAt')}>{data.date}</div>
      </div>
      <div className={cn('body')}>{data.text}</div>
      <button className={cn('answer')} onClick={callbacks.onAnswer}>
        {text.reply}
      </button>
    </div>
  );
}

Comment.propTypes = {
  data: propTypes.object.isRequired,
  level: propTypes.number.isRequired,
  onAnswer: propTypes.func.isRequired,
  text: propTypes.objectOf(propTypes.string),
  ref: propTypes.object
};

export default React.memo(Comment);
