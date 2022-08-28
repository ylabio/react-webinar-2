import React from "react";
import { cn as bem } from "@bem-react/classname";
// import propTypes from "prop-types";
// import './style.css';

function CommentLogin({ log, children, btnNewComment }) {
  const cn = bem("CommentLogin");

  if (log) {
    return children;
  } else {
    if (btnNewComment) {
      return (
        <div className={cn()}>
          Войдите чтоб иметь возможность ответить {btnNewComment}
        </div>
      );
    } else {
      return (
        <div className={cn()}>
          Войдите чтоб иметь возможность комментировать
        </div>
      );
    }
  }
}

export default React.memo(CommentLogin);
