import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentList({ all, children, log }) {
  const cn = bem("Comments");

  return (
    <div className={log ? cn() : cn("nosession")}>
      <div>Комментарии ({all})</div>
      <div>{children}</div>
    </div>
  );
}

export default React.memo(CommentList);
