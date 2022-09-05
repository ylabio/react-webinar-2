import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function ProtectedItemComment({ link, linkState, onCancel }) {
  const cn = bem("ProtectedItemComment");

  return (
    <div className={cn()}>
      <Link className={cn("link")} to={link} state={linkState}>
        Войдите
      </Link>
      , чтобы иметь возможность ответить.{" "}
      {onCancel && (
        <span className={cn("cancel")} onClick={onCancel}>
          Отмена
        </span>
      )}
    </div>
  );
}

ProtectedItemComment.propTypes = {
  link: propTypes.string,
  linkState: propTypes.object,
  onCancel: propTypes.func,
};

ProtectedItemComment.defaultProps = {
  link: "/login",
  linkState: {},
};

export default React.memo(ProtectedItemComment);
