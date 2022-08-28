import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import formatDate from '../../../utils/format-date';
import CommentAdding from '../comment-adding';
import './style.css';

function CommentItem(props) {
  const cn = bem('CommentItem');

  const handleAnswerClick = useCallback(() => {
    props.handleTarget('comment');
    props.handleIsActive(props.item._id);
  }, [props.handleTarget]);

  const handleCancel = useCallback(() => {
    props.handleTarget('article');
    props.handleIsActive(null);
  }, [props.handleTarget]);

  return (
    <div className={cn()} style={{marginLeft: `${props.item.level * 30}px`}}>
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
      {(props.target === 'comment' && props.isActive) &&
        <CommentAdding
          isAuth={props.isAuth}
          message={props.message}
          target={props.target}
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
  isAuth: propTypes.bool,
  message: propTypes.string,
  target: propTypes.oneOf(['article', 'comment']).isRequired,
  handleSubmit: propTypes.func,
  handleChange: propTypes.func,
  handleTarget: propTypes.func,
  handleEnter: propTypes.func,
  handleIsActive: propTypes.func
}

CommentItem.defaultProps = {
}

export default React.memo(CommentItem);