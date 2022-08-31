import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentList(props) {
  const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('comment.title')} ({props.count})</div>
      <div className={cn('list')}>
        {props.comments && props.comments.map(item =>
          <div key={item._id}>
            {props.renderComment(item)}
          </div>
        )}
      </div>
    </div>
  )
}

CommentList.propTypes = {
  comments: propTypes.any,
  count: propTypes.number,
  renderComment: propTypes.func,
  t: propTypes.func,
}

CommentList.defaultProps = {
  comments: {},
  count: 0,
  renderComment: () => {},
  t: text => text,
}

export default React.memo(CommentList);
