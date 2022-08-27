import React from "react";
import Comment from "../comment";

function CommentsBranch({ branch }) {
  console.log({branch})

  return (
    <div>
      {branch.map(obj => (
        <Comment data={obj.comment} key={obj.comment._id} lvl={obj.lvl} />
      ))}
    </div>
  );
}

export default CommentsBranch;