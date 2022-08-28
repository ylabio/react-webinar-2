import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentList({ all, children }) {
  const cn = bem("Comments");

  return (
    <div className={cn()}>
      <div>Комментарии {all}</div>
      <div>{children}</div>
    </div>
  );
}

export default React.memo(CommentList);
