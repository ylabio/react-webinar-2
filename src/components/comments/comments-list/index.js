import React, {useState, useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CommentItem from '../comment-item';
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');

  // для отображения формы комментария только у одного комментария
  const [activeComment, setActiveComment] = useState(null);

  const handleIsActive = useCallback((id) => {
    setActiveComment(id);
  }, [activeComment]);

  return (
    <ul className={cn()}>
      {props.items?.map((item) =>
        <CommentItem
          key={item._id}
          item={item}
          isActive={activeComment === item._id}
          isAuth={props.isAuth}
          message={props.message}
          target={props.target}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleTarget={props.handleTarget}
          handleIsActive={handleIsActive}
        />
      )}
    </ul>
  )
}

CommentsList.propTypes = {
  items: propTypes.array,
  target: propTypes.oneOf(['article', 'comment']).isRequired,
  handleTarget: propTypes.func,
  handleChange: propTypes.func,
  handleTarget: propTypes.func,
  handleCancel: propTypes.func,
}

CommentsList.defaultProps = {
}

export default React.memo(CommentsList);
