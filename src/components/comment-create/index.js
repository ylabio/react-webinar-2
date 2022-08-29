import React, { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "../comments-forms.css";
import { Link } from "react-router-dom";

function CommentCreate({ onCreate, articleId, isLoggedIn, currentTargetId }) {
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

  if (currentTargetId !== articleId) return <></>;

  return isLoggedIn ? (
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
  ) : (
    <div style={{ marginTop: "30px", marginLeft: "30px" }}>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  );
}

export default CommentCreate;
