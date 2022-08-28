import React, {useState} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";


function CommentForm({hasCancelButton, handleSubmit, handleCancel, titleLabel}) {
  const cn = bem("CommentForm");
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <span className={cn("title")}>Новый {titleLabel}</span>
      <textarea className={cn("textarea")} value={text} onChange={(e) => setText(e.target.value)}/>
      <div className={cn("controls")}>
        <button disabled={isTextareaDisabled}>Отправить</button>
        {hasCancelButton && <button type="button" onClick={handleCancel}>Отмена</button>}
      </div> 
    </form>
  )
}

CommentForm.propTypes = {
  hasCancelButton: propTypes.bool,
  handleSubmit: propTypes.func,
  handleCancel: propTypes.func,
  titleLabel: propTypes.string,
}

CommentForm.defaultProps = {
  hasCancelButton: false,
  handleSubmit: () => {},
  handleCancel: () => {},
  titleLabel: 'комментарий',
}

export default React.memo(CommentForm);
