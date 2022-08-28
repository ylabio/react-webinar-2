import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Comment from "../comment";
import CommentCreate from "../comment-create";
import ReplyCreate from "../reply-create";

function CommentSection({ list, count }) {
  const cn = bem("CommentSection");
  return (
    <div className={cn()}>
      <h2 className={cn("header")}>Комментарии ({count})</h2>
      {list.length && <Comment item={list[0]} />}
      <CommentCreate />
      <ReplyCreate />
    </div>
  );
}

export default CommentSection;
