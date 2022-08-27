import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentItem({ item }) {
  const cn = bem("Comment");

  return (
    <div className={cn()}>
      <div className={cn("name")}>
        <h5>User1</h5> <span>{item.dateCreate}</span>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <div>
        <p>Ответить</p>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
