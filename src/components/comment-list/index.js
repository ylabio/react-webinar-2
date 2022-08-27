import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import CommentItem from "../comment-item";
import "./styles.css";

function CommentList({ comments }) {
  const cn = bem("Comments");

  console.log("comments", comments && comments.map((item) => item));

  return (
    <div className={cn()}>
      <div>Комментарии ({comments.length})</div>
      <div>
        {comments.map((item, index) => {
          return <CommentItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default React.memo(CommentList);
