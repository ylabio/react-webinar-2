import React, { useCallback, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./styles.css";

const AddNewComment = (props) => {
  let cn = bem("NewComment");
  let [commentText, setCommentText] = useState("");
  const placeholder = props.parent?.author
    ? `Мой ответ для ${props.parent?.author?.profile?.name}`
    : "Текст";

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      let parent = props.parent;
      props.onSubmit(commentText, parent);
    },
    [commentText, props]
  );

  const onCancel = useCallback((e) => {
    e.preventDefault();
    props.onCancel();
  }, []);

  const render = () => {
    return (
      <>
        {props.createCommentOpen ? (
          <div className={cn()}>
            <div className={cn("header")}>{props.header}</div>
            <form className={cn("form")}>
              <label htmlFor="text">
                <textarea
                  id="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.currentTarget.value)}
                  placeholder={placeholder}
                />
              </label>
              <div className={cn("buttons")}>
                <button onClick={onSubmit} className={cn("button-submit")}>
                  Отправить
                </button>
                {props.onCancel ? (
                  <button onClick={onCancel} className={cn("button-cancel")}>
                    Отмена
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  return <>{props.token ? render() : <>{props.description}</>}</>;
};

AddNewComment.propTypes = {
  parent: propTypes.object,
  onSubmit: propTypes.func,
  onCancel: propTypes.func,
  createCommentOpen: propTypes.bool,
  header: propTypes.string,
};

export default React.memo(AddNewComment);
