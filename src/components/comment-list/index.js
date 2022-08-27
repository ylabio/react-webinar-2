import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentList({ comments }) {
  const cn = bem("Comments");

  return (
    <div className={cn()}>
      <div>Комментарии ({comments.length})</div>
      <div>
        {comments.map((item, index) => {
          return <div key={index}>{item.text}</div>;
        })}
      </div>
    </div>
  );
}

export default React.memo(CommentList);
