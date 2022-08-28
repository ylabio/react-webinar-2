import React from "react";
import Comment from "../comment";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import CommentNew from "../comment-new";

import "./style.css";

function CommentList({comments, count, setIdUnder, idArticle, idUnder, submitComment, exists}) {
  const cn = bem('CommentList')
  return(
    <div className={cn()}>
      <h3 className={cn('title')}>Комментарии ({count})</h3>
      {comments.map(item => (
        <Comment 
          key={item.id} 
          id={item.id} 
          name={item.name} 
          text={item.text} 
          dateCreate={item.dateCreate} 
          level={item.level} 
          setIdUnder={setIdUnder}
          commentForm={
            idUnder === item.id ?
            <CommentNew idArticle={idArticle} setIdUnder={setIdUnder} submitComment={submitComment} type={'comment'} exists={exists}/> : 
            null
          }
        />
      ))}

      {
        idArticle === idUnder ?
        <CommentNew submitComment={submitComment} type={'article'} exists={exists}/> : 
        null 
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: propTypes.array,
  count: propTypes.number.isRequired,
  setIdUnder: propTypes.func,
  idArticle: propTypes.string,
  idUnder: propTypes.string,
  submitComment: propTypes.func.isRequired,
  exists: propTypes.bool.isRequired
}

export default React.memo(CommentList);