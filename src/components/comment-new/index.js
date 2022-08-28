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
  onChangeValue: propTypes.func,
  submitTitle: propTypes.string,
  cancelTitle: propTypes.string,
  onSubmit: propTypes.func,
  onCancel: propTypes.func,
};

CommentNew.defaultProps = {
  title: "Новый комментарий",
  submitTitle: "Отправить",
  onSubmit: () => {},
  onCancel: () => {},
};

export default React.memo(CommentNew);
