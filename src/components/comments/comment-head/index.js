import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentHead({ title, count }) {
  const cn = bem("CommentHead");
  return (
    <div className={cn()}>
      {title} ({count})
    </div>
  );
}

export default React.memo(CommentHead);
