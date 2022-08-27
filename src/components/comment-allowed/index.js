import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

const CommentAllowed = ({
  loginTitle,
  cancelTitle,
  loginText,
  onlogin,
  onCancel,
}) => {
  const cn = bem("CommentAllowed");
  return (
    <div className={cn()}>
      <span className={cn("link")} onClick={onlogin}>
        {loginTitle}
      </span>
      <span>, {loginText}{" "}</span>
      <span className={cn("cancel")} onClick={onCancel}>
        {cancelTitle}
      </span>
    </div>
  );
};

CommentAllowed.propTypes = {
  loginTitle: propTypes.node.isRequired,
  loginText: propTypes.string,
  cancelTitle: propTypes.string,
  indentLevel: propTypes.number,
  onlogin: propTypes.func,
  onCancel: propTypes.func,
};

CommentAllowed.defaultProps = {
  loginText: "",
  cancelTitle: "",
  indentLevel: 0,
};

export default React.memo(CommentAllowed);
