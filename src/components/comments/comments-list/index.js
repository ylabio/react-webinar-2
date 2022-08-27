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
          isAuth={props.isAuth}
          message={props.message}
          target={props.target}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleTarget={props.handleTarget}
          handleIsActive={props.handleActive}
        />
      )}
    </ul>
  )
}

CommentsList.propTypes = {
  items: propTypes.array,
  target: propTypes.oneOf(['article', 'comment']).isRequired,
  activeCommentId: propTypes.string,
  handleTarget: propTypes.func,
  handleChange: propTypes.func,
  handleTarget: propTypes.func,
  handleCancel: propTypes.func,
  handleIsActive: propTypes.func,
}

CommentsList.defaultProps = {
}

export default React.memo(CommentsList);
