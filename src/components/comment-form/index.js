import React from "react";
import Stack from "../stack";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const CommentForm = ({ title, onClose, onSubmit, value, onChange }) => {
  const cn = bem("CommentForm");

  return (
    <Stack px={"none"} py={"none"} className={cn()} spacing={"small"}>
      <div className={cn("title")}>{title || "Новый комментарий"}</div>
      <textarea value={value} onChange={onChange} className={cn("content")} />
      <Stack direction={"row"}>
        <button onClick={onSubmit} >Отправить</button>
        {title && <button onClick={onClose} className={cn('cancel-btn')}>Отмена</button>}
      </Stack>
    </Stack>
  );
};

CommentForm.propTypes = {
  title: propTypes.string,
  onClose: propTypes.func,
  onSubmit: propTypes.func,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

CommentForm.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
};

export default React.memo(CommentForm);
