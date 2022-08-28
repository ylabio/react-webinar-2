import React from "react";
import CommentForm from "../comment-form";
import CommentTitleLogin from "../comment-title-login";
import propTypes from "prop-types";

function CommentNew({idArticle, setIdUnder, submitComment, type, exists}) {
  return(
    <>
      {
        exists ?
        <CommentForm idArticle={idArticle} setIdUnder={setIdUnder} submitComment={submitComment} type={type}/> :
        <CommentTitleLogin idArticle={idArticle} setIdUnder={setIdUnder}/>
      }
    </>
  );
}

CommentNew.propTypes = {
  idArticle: propTypes.string,
  setIdUnder: propTypes.func,
  submitComment: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  exists: propTypes.bool.isRequired
}

CommentNew.defaultProps = {
  idArticle: null,
  setIdUnder: null
}

export default React.memo(CommentNew)