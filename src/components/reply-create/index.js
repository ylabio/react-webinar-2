import React, { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";

function ReplyCreate({ onReply, commentId }) {
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

  return (
    <form className={cn()} onSubmit={submit}>
      <label className={cn("label")} htmlFor="reply-create-ta">
        Новый ответ
      </label>
      <textarea id="reply-create-ta" className={cn("field")} ref={reply_text} />
      <button type="submit">Отправить</button>
      <button type="button">Отмена</button>
    </form>
  );
}

export default ReplyCreate;
