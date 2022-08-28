import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {useParams} from "react-router-dom";

function CommentsList(props) {
  const cn = bem('CommentsList');

  const params = useParams()

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {'Комментарии'} ({props.commentsCount})
      </div>
      <div className={cn('list')}>
        <div className={cn('list')}>
          {props.comments.map(item =>
            props.comment(item)
          )}
        </div>
        {props.children}
      </div>
    </div>
  )
}

CommentsList.propTypes = {
  commentsCount: propTypes.number,
  comments: propTypes.arrayOf(propTypes.object),
  comment: propTypes.func,
  current: propTypes.string,
  children: propTypes.node,
}

CommentsList.defaultProps = {

}

export default React.memo(CommentsList);