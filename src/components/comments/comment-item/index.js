import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import formatDate from '../../../utils/format-date';

function CommentItem({item}) {
  const cn = bem('CommentItem');

  return (
    <div className={cn()}>
      <div className={cn('header')}>
        <span className={cn('username')}>{item.author.profile.name}</span>
        <span className={cn('date')}>{formatDate(item.dateCreate)}</span>
      </div>
      <div className={cn('main')}>
        {item.text}
      </div>
      <button className={cn('answer')}>Ответить</button>
    </div>
  )
}

CommentItem.propTypes = {
  item: propTypes.object,
}

CommentItem.defaultProps = {
}

export default React.memo(CommentItem);
