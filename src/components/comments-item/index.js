import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {getDate} from '../../utils/comments/getData';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const CommentItem = ({data, onReply}) => {
  const reply = useCallback(() => {
    onReply(data._id);
  }, []);

  const cn = bem('comment');

  return (
    <div className={cn('item')}>
      <b>{data.author.profile.name}</b>
      <div className={cn('date')}>{getDate(data.dateCreate)}</div>
      <div className={cn('text')}>{data.text}</div>
      <button className={cn('reply')} onClick={reply}>Ответить</button>
    </div>
  )
};

CommentItem.PropTypes = {
  data: PropTypes.object.isRequired,
  onReply: PropTypes.func,
};

export default React.memo(CommentItem);