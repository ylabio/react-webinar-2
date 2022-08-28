import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function CommentFormDenied({ condition, onCloseReply, t }) {
  const cn = bem("CommentFormDenied");

  const callbacks = {
    onCloseReply: useCallback((e) => onCloseReply(), [onCloseReply]),
  };

  return (
    <div className={cn("")}>
      <Link className={cn("link")} to="/login">
        {t("comments.signIn")}
      </Link>
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
  parentId: propTypes.string,
  onCloseReply: propTypes.func,
  onSendComment: propTypes.func,
};

CommentFormDenied.defaultProps = {
  //   onAdd: () => {},
  //   labelCurr: "₽",
  //   labelAdd: "Добавить",
};

export default React.memo(CommentFormDenied);
