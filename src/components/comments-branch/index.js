import React, { useState } from "react";
import Comment from "../comment";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CommentsBranch({ 
  branch, 
  exists, 
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId 
}) {
  const cn = bem('CommentsBranch');

  return (
    <div className={cn()}>
      {branch.map(obj => (
        <Comment 
          data={obj.comment} 
          key={obj.comment._id} 
          lvl={obj.lvl} 
          exists={exists}
          link={link}
          setShowCommentForm={setShowCommentForm}
          lastCommentId={lastCommentId}
          setLastCommentId={setLastCommentId}
        />
      ))}
    </div>
  );
}

export default CommentsBranch;