import React, { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";
import { Link } from "react-router-dom";

function ReplyCreate({
  onReply,
  commentId,
  isLoggedIn,
  currentTargetId,
  onCancel,
}) {
  const reply_text = useRef();
  const cn = bem("ReplyCreate");

  const submit = (e) => {
    e.preventDefault();
    onReply({
      text: reply_text.current.value,
      parent_id: commentId,
      parent_type: "comment",
    });
  };

  if (commentId !== currentTargetId) return <></>;

  return isLoggedIn ? (
    <form className={cn()} onSubmit={submit}>
      <label className={cn("label")} htmlFor="reply-create-ta">
        Новый ответ
      </label>
      <textarea id="reply-create-ta" className={cn("field")} ref={reply_text} />
      <button type="submit">Отправить</button>
      <button type="button" onClick={onCancel}>
        Отмена
      </button>
    </form>
  ) : (
    <div style={{ marginTop: "30px" }}>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность ответить
      <button className={cn("cancelReply")} onClick={onCancel}>
        Отмена
      </button>
    </div>
  );
}

export default ReplyCreate;
