import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Comment({data, level, onAnswer, text}) {
  const cn = bem('Comment');

  const callbacks = {
    onAnswer: () => onAnswer(data._id)
  };

  return (
    <div style={{paddingLeft: `${level * 30}px`}} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('author')}>{data.author}</div>
        <div className={cn('createdAt')}>{data.date}</div>
      </div>
      <div className={cn('body')}>{data.text}</div>
      <button className={cn('answer')} onClick={callbacks.onAnswer}>{text.reply}</button>
    </div>
  );
}

Comment.propTypes = {
  data: propTypes.object,
  level: propTypes.number,
  onAnswer: propTypes.func
};

export default React.memo(Comment);
