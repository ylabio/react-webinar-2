import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Protected from "../../containers/protected";
import "./styles.css";

function CommentForm({
  submit,
  submitLabel,
  canselLabel,
  hasCancelButton = false,
  handleCancel,
  id,
  type,
  parentId,
  isAuth,
  onSignIn,
}) {
  const cn = bem("CommentForm");
  const navigate = useNavigate();
  const location = useLocation();
  const [value, change] = useState(value);

  const onChange = useCallback(
    (event) => {
      change(event.target.value);
    },
    [change]
  );

  useEffect(() => {
    change(value);
  }, [value]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value) {
      submit(id, value, type);
      hasCancelButton && handleCancel();
    }
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      {isAuth ? (
        <>
          <div className={cn("title")}>Новый комментарий</div>
          <textarea className={cn("text")} value={value} onChange={onChange} />
          <button type="submit" className={cn("submit")}>
            {submitLabel}
          </button>
        </>
      ) : (
        <>
          <button className={cn("signIn")} onClick={onSignIn}>
            Войдите
          </button>
          <span className={cn("message")}>
            ,чтобы иметь возможность комментировать
          </span>
        </>
      )}

      {hasCancelButton && (
        <button type="button" className={cn("cancel")} onClick={handleCancel}>
          {canselLabel}
        </button>
      )}
    </form>
  );
}

export default React.memo(CommentForm);
