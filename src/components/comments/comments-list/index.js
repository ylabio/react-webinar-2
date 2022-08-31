import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CommentItem from '../comment-item';
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');
  
  return (
    <ul className={cn()}>
      {props.items?.map((item) =>
        <CommentItem
          key={item._id}
          item={item}
          isActive={props.activeCommentId === item._id}
          isNew={props.newCommentId === item._id}
          isAuth={props.isAuth}
          message={props.message}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleEnter={props.handleEnter}
          handleIsActive={props.handleActive}
        />
      )}
    </ul>
  )
}

CommentsList.propTypes = {
  items: propTypes.array,
  activeCommentId: propTypes.string,
  newCommentId: propTypes.string,
  handleChange: propTypes.func,
  handleCancel: propTypes.func,
  handleEnter: propTypes.func,
  handleIsActive: propTypes.func,
}

CommentsList.defaultProps = {
}

export default React.memo(CommentsList);
