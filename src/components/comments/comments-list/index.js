import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsList({
  comments,
  renderComment,
  renderForm,
  replyIsOpen,
  articleId,
}) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      {comments.map((comment) => renderComment(comment))}
      {!replyIsOpen && renderForm(articleId, "article")}
    </div>
  );
}

CommentsList.propTypes = {
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  renderComment: propTypes.func,
};

CommentsList.defaultProps = {
  comments: [],
  renderComment: (item) => {
    return item.toString();
  },
};

export default React.memo(CommentsList);
