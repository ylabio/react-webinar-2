import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function CommentFormDenied({ condition, onCloseReply, onSignIn, t }) {
  const cn = bem("CommentFormDenied");

  const callbacks = {
    onCloseReply: useCallback(() => onCloseReply(), [onCloseReply]),
    onSignIn: useCallback(() => onSignIn(), [onSignIn]),
  };

  return (
    <div className={cn("")}>
      <span className={cn("link")} onClick={callbacks.onSignIn}>
        {t("comments.signIn")}
      </span>
      {", "}
      <span>{t("comments.toComment")}</span>
      {condition && (
        <>
          {". "}
          <span className={cn("cancel")} onClick={callbacks.onCloseReply}>
            {t("comments.cancel")}
          </span>
        </>
      )}
    </div>
  );
}

CommentFormDenied.propTypes = {
  condition: propTypes.bool.isRequired,
  onCloseReply: propTypes.func.isRequired,
  onSignIn: propTypes.func.isRequired,
  t: propTypes.func.isRequired,
};

CommentFormDenied.defaultProps = {};

export default React.memo(CommentFormDenied);
