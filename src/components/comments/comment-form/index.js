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
  onCloseReply,
  t,
}) {
  const cn = bem("CommentForm");
  const [commentText, setCommentText] = useState("");

  const callbacks = {
    onSendComment: useCallback(
      (e) => {
        e.preventDefault();
        if (commentText) {
          onSendNewComment(authId, commentText, parentId, parentType);
        } else {
        }
      },
      [commentText]
    ),
    onCloseReply: useCallback((e) => onCloseReply(), [onCloseReply]),
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
            // сервер позволяет писать комментарий любого размера, при количестве выше
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
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
          t={t}
        />
      )}
    </div>
  );
}

CommentForm.propTypes = {
  parentId: propTypes.string,
  onCloseReply: propTypes.func,
  onSendComment: propTypes.func,
  t: propTypes.func,
};

CommentForm.defaultProps = {
  //   onAdd: () => {},
  //   labelCurr: "₽",
  //   labelAdd: "Добавить",
};

export default React.memo(CommentForm);
