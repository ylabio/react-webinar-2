import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { getDate } from './utils';
import './style.css';

const CommentItem = ({ data, onReply }) => {
  const reply = useCallback(() => {
    onReply(data._id);
  }, []);

  return (
    <div className='comment-item'>
      <b>{data.author.profile.name}</b>
      <p className='comment-item__date'>{getDate(data.dateCreate)}</p>
      <p className='comment-item__text'>{data.text}</p>
      <button className='comment-item__button' onClick={reply}>Ответить</button>
    </div>
  )
};

CommentItem.PropTypes = {
  data: PropTypes.object.isRequired,
  onReply: PropTypes.func,
};

export default React.memo(CommentItem);