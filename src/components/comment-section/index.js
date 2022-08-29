import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Comment from "../comment";
import CommentCreate from "../comment-create";
import { Link } from "react-router-dom";

function CommentSection({ list, count, isLoggedIn, createComment, articleId }) {
  const cn = bem("CommentSection");

  const comments = list.map((item) => (
    <Comment
      item={item}
      key={item._id}
      isLoggedIn={isLoggedIn}
      onReply={createComment}
    />
  ));
  const create_comment_form = isLoggedIn ? (
    <CommentCreate onCreate={createComment} articleId={articleId} />
  ) : (
    <div style={{ marginTop: "30px" }}>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );

  return (
    <div className={cn()}>
      <h2 className={cn("header")}>Комментарии ({count})</h2>
      {!!list.length && comments}
      {create_comment_form}
    </div>
  );
}

export default CommentSection;
