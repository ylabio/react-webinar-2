import React, { useCallback, useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import CommentNotice from "../comment-notice";

function CommentForm({
  submit,
  submitLabel,
  canselLabel,
  hasCancelButton = false,
  handleCancel,
  id,
  type,
  title,
  isAuth,
  onSignIn,
}) {
  const cn = bem("CommentForm");
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
    <form className={cn(type === "article" ? "main" : "")} onSubmit={onSubmit}>
      {isAuth ? (
        <>
          <div className={cn("title")}>{title}</div>
          <textarea className={cn("text")} value={value} onChange={onChange} />
          <button type="submit" className={cn("submit")}>
            {submitLabel}
          </button>
        </>
      ) : (
        <CommentNotice
          onSignIn={onSignIn}
          canselLabel={canselLabel}
          hasCancelButton={hasCancelButton}
          handleCancel={handleCancel}
        />
      )}
      {hasCancelButton && isAuth && (
        <button type="button" className={cn("cancel")} onClick={handleCancel}>
          {canselLabel}
        </button>
      )}
    </form>
  );
}

export default React.memo(CommentForm);
