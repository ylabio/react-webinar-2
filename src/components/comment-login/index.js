import React from "react";
import { cn as bem } from "@bem-react/classname";
// import propTypes from "prop-types";
// import './style.css';

function CommentLogin({ log, children }) {
  const cn = bem("CommentLogin");

  if (log) {
    return children;
  } else {
    return <div className={cn()}>Войдите чтоб иметь возможность ответить</div>;
  }
}

export default React.memo(CommentLogin);
