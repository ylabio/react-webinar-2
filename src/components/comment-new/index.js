import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import propTypes from "prop-types";

const CommentNew = ({
  title,
  value,
  submitTitle,
  cancelTitle,
  onChangeValue,
  onSubmit,
  onCancel,
}) => {
  const cn = bem("CommentNew");

  return (
    <div className={cn()}>
      <span className={cn("title")}>{title}</span>
      <textarea
        className={cn("text")}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      ></textarea>
      <div className={cn("buttons")}>
        <button onClick={onSubmit}>{submitTitle}</button>
        {cancelTitle && <button onClick={onCancel}>{cancelTitle}</button>}
      </div>
    </div>
  );
};

CommentNew.propTypes = {
  title: propTypes.string,
  value: propTypes.string,
  setValueCallback: propTypes.func,
  submitTitle: propTypes.string,
  cancelTitle: propTypes.string,
  submitCallback: propTypes.func,
  cancelCallback: propTypes.func,
};

CommentNew.defaultProps = {
  newCommentTitle: "New comment",
  submitTitle: "Submit",
};

export default React.memo(CommentNew);
