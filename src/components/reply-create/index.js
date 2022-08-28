import React from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";

function ReplyCreate() {
  const cn = bem("ReplyCreate");

  return (
    <form className={cn()}>
      <label className={cn("label")} htmlFor="reply-create-ta">
        Новый ответ
      </label>
      <textarea id="reply-create-ta" className={cn("field")} />
      <button type="submit">Отправить</button>
      <button type="button">Отмена</button>
    </form>
  );
}

export default ReplyCreate;
