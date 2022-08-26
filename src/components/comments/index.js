import Comment from "./coment";
import ProtectedComments from "containers/protected-comments";
import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Comments({comments, setEditor, textEditor, articleId}) {

  // CSS классы по БЭМ
  const cn = bem('Comments');
  console.log(comments)
  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({comments.length})</p>
      {comments.map(comment => {
        return <Comment textEditor={textEditor} setEditor={setEditor} comment={comment} key={comment.id}/>
      })}
      <ProtectedComments
        redirect={'/login'}>{articleId===textEditor ? 'yes' : 'no'}</ProtectedComments>
    </div>
  )
}

Comments.propTypes = {
  comments: propTypes.array.isRequired,
  setEditor: propTypes.func.isRequired,
  textEditor: propTypes.string,
  articleId: propTypes.string,
}

Comments.defaultProps = {
  comments: [],
}

export default React.memo(Comments);
