import React from "react"
import propTypes from 'prop-types';
import Comment from "../../components/comment";

function CommentContainer({ comments, margin }) {
  return (
    <>
      {
        comments.map((comment) => (
          <div className='Comment-container' key={comment._id} style={{marginLeft: margin + 'px'}}>
            <Comment comment={comment}/>
            <CommentContainer comments={comment.children} margin={30}/>
          </div>
        ))
      }
    </>
  )
}

CommentContainer.propTypes = {
  comment: propTypes.object,
  margin: propTypes.number,
}

export default React.memo(CommentContainer);
