import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";
import CommentFormDenied from "../comment-form-denied";

function CommentForm({
  authId,
  parentId,
  parentType,
  onSendNewComment,
  onSignIn,
  onCloseReply,
  t,
}) {
  const cn = bem("CommentForm");
  const [commentText, setCommentText] = useState("");
  const [textErr, setTextErr] = useState("");

  const callbacks = {
    onSendComment: useCallback(
      (e) => {
        e.preventDefault();
        if (/\S/.test(commentText)) {
          onSendNewComment(authId, commentText, parentId, parentType);
        } else {
          setTextErr("Комментарий не может быть пустым");
        }
      },
      [commentText]
    ),
    onCloseReply: useCallback((e) => onCloseReply(), [onCloseReply]),
    onSignIn: useCallback(() => onSignIn(), [onSignIn]),
  };

  return (
    <div className={cn()}>
      {authId ? (
        <>
          <div className={cn("head")}>
            {parentType == "comment"
              ? t("comments.form.newAnswer")
              : t("comments.form.newComment")}
          </div>
          <textarea
            className={cn("input")}
            onChange={(e) => {
              setCommentText(e.target.value);
              setTextErr("");
            }}
            value={commentText}
          />
          <span className={cn("error")}>{textErr}</span>
          <div className={cn("actions")}>
            <button className={cn("buttons")} onClick={callbacks.onSendComment}>
              {t("comments.form.send")}
            </button>
            {parentType == "comment" && (
              <button
                className={cn("buttons")}
                onClick={callbacks.onCloseReply}
              >
                {t("comments.cancel")}
              </button>
            )}
          </div>
        </>
      ) : (
        <CommentFormDenied
          condition={parentType == "comment"}
          onCloseReply={callbacks.onCloseReply}
          onSignIn={callbacks.onSignIn}
          t={t}
        />
      )}
    </div>
  );
}

CommentForm.propTypes = {
  authId: propTypes.string,
  parentId: propTypes.string,
  parentType: propTypes.string.isRequired,
  onCloseReply: propTypes.func.isRequired,
  onSendNewComment: propTypes.func.isRequired,
  onSignIn: propTypes.func.isRequired,
  t: propTypes.func.isRequired,
};

CommentForm.defaultProps = {
  authId: "",
  parentId: "",
};

export default React.memo(CommentForm);
