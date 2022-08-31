import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import formatDate from '../../../utils/format-date';
import CommentAdding from '../comment-adding';
import './style.css';

const MAX_NESTING_LEVEL = 5;

function CommentItem(props) {
  const cn = bem('CommentItem');
  const level = props.item.level < MAX_NESTING_LEVEL ? props.item.level : 5;
  
  const handleAnswerClick = useCallback(() => {
    props.handleIsActive(props.item._id);
  }, [props.handleIsActive]);

  const handleCancel = useCallback(() => {
    props.handleIsActive(null);
  }, [props.handleIsActive]);

  return (
    <div
      className={cn('',{'new': props.isNew})}
      style={{marginLeft: `${level * 30}px`}}
    >
      <div className={cn('comment')}>
        <div className={cn('header')}>
          <span className={cn('username')}>{props.item.author.profile.name}</span>
          <span className={cn('date')}>{formatDate(props.item.dateCreate)}</span>
        </div>
        <div className={cn('main')}>
          {props.item.text}
        </div>
        <button className={cn('answer')} onClick={handleAnswerClick}>Ответить</button>
      </div>
      {props.isActive &&
        <CommentAdding
          isAuth={props.isAuth}
          message={props.message}
          formType={'comment'}
          author={props.item.author.profile}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleEnter={props.handleEnter}
          handleCloseCommentAnswer={handleCancel}
        />
      }
    </div>
  )
}

CommentItem.propTypes = {
  item: propTypes.object,
  isActive: propTypes.bool,
  isNew: propTypes.bool,
  isAuth: propTypes.bool,
  message: propTypes.string,
  handleSubmit: propTypes.func,
  handleChange: propTypes.func,
  handleEnter: propTypes.func,
  handleIsActive: propTypes.func
}

CommentItem.defaultProps = {
}

export default React.memo(CommentItem);
