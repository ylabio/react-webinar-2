import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function CommentNotice({
  onSignIn,
  hasCancelButton = false,
  handleCancel,
  canselLabel,
}) {
  const cn = bem("CommentNotice");
  return (
    <div className={cn()}>
      <button className={cn("signIn")} onClick={onSignIn}>
        Войдите
      </button>
      <span className={cn("message")}>
        ,чтобы иметь возможность комментировать.
      </span>
      {hasCancelButton && (
        <button type="button" className={cn("cancel")} onClick={handleCancel}>
          {canselLabel}
        </button>
      )}
    </div>
  );
}

CommentNotice.propTypes = {
  canselLabel: propTypes.string,
  hasCancel: propTypes.func,
  onSignIn: propTypes.func,
  hasCancelButton: propTypes.bool,
};

CommentNotice.defaultProps = {
  hasCancelButton: false,
};

export default React.memo(CommentNotice);
