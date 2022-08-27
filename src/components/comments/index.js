import Comment from "./coment";
import ProtectedComments from "containers/protected-comments";
import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comments({comments, articleId}) {

  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({comments.length})</p>
      {comments.map(comment => {
        return <Comment comment={comment} key={comment.id}/>;
      })}

      <ProtectedComments id={articleId} redirect={'/login'}/>
    </div>
  )
}

Comments.propTypes = {
  comments: propTypes.array.isRequired,
  articleId: propTypes.string,
}

Comments.defaultProps = {
  comments: [],
}

export default React.memo(Comments);
