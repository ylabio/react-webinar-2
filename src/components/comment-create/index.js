import React from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";

function CommentCreate() {
  const cn = bem("CommentCreate");

  return (
    <form className={cn()}>
      <label className={cn("label")} htmlFor="comment-create-ta">
        Новый комментарий
      </label>
      <textarea id="comment-create-ta" className={cn("field")} />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default CommentCreate;
