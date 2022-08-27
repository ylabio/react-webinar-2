import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Comment({data, children, level}) {
  const cn = bem('Comment');
  return (
    <div style={{paddingLeft: `${level * 30}px`}} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('author')}>{data.author}</div>
        <div className={cn('createdAt')}>{data.date}</div>
      </div>
      <div className={cn('body')}>{data.text}</div>
      <button className={cn('answer')}>Ответить</button>
      {children}
    </div>
  );
}

Comment.propTypes = {
  data: propTypes.object,
  children: propTypes.node,
  level: propTypes.number
};

export default React.memo(Comment);
