import React, { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";

function CommentCreate({ onCreate, articleId }) {
  const comment_text = useRef();
  const cn = bem("CommentCreate");

  const submit = (e) => {
    e.preventDefault();
    onCreate({
      text: comment_text.current.value,
      parent_id: articleId,
      parent_type: "article",
    });
  };

  return (
    <form className={cn()} onSubmit={submit}>
      <label className={cn("label")} htmlFor="comment-create-ta">
        Новый комментарий
      </label>
      <textarea
        id="comment-create-ta"
        className={cn("field")}
        ref={comment_text}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default CommentCreate;
