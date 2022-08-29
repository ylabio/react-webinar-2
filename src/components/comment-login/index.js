import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.css";

function CommentLogin({ log, children, setArea }) {
  const cn = bem("CommentLogin");

  if (log) {
    return children;
  } else {
    if (setArea) {
      return (
        <div className={cn()}>
          <Link to="/login">Войдите</Link>, чтоб иметь возможность ответить{" "}
          <i onClick={() => setArea(0)}>Отмена</i>
        </div>
      );
    } else {
      return (
        <div className={cn("fix")}>
          <p>
            <Link to="/login">Войдите</Link>, чтоб иметь возможность
            комментировать
          </p>
        </div>
      );
    }
  }
}

export default React.memo(CommentLogin);
