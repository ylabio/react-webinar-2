import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comments({comments, children, renderComment}) {

  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({comments.length})</p>
      {comments.map(comment => <div key={comment.id}>{renderComment(comment)}</div>)}

      {children}
    </div>
  )
}

Comments.propTypes = {
  renderComment: propTypes.func,
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  children: propTypes.node,
}

Comments.defaultProps = {
  comments: [],
}

export default React.memo(Comments);
