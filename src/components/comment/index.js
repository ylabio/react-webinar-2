import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import { formatTime } from '../../utils/format-time';

function Comment({ 
  data,
  lvl, 
}) {
  const cn = bem('Comment');

  return (
    <div className={cn()} style={{marginLeft: String(30 * lvl) + 'px'}}>
      <div className={cn('header')}>
        <span className={cn('username')}>{data.author.profile.name}</span>
        <span className={cn('time')}>{formatTime(data.dateUpdate)}</span>
      </div>

      <p className={cn('text')}>
        {data.text + ' ' + data._id}
      </p>

      <span 
        className={cn('answer')}
      >Ответить</span>
    </div>
  );
}

Comment.propTypes = {};

Comment.defaultProps = {};

export default Comment;