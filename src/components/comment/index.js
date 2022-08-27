import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import AddNewComment from "../add-new-comment";
import "./styles.css";

const Comment = (props) => {
  let cn = bem("Comment");
  let date = new Date(props.comment.dateCreate);

  date = date
    .toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(/г\.\,/, "в");
  let margin =
    props.comment.parent._tree.length > 1
      ? (props.comment.parent._tree.length - 1) * 30
      : 0;

  return (
    <div className={cn()} style={{ paddingLeft: margin }}>
      <div className={cn("header")}>
        <div className={cn("username")}>
          {props.comment.author.profile.name}
        </div>
        <div className={cn("date")}>{date}</div>
      </div>
      <div className={cn("text")}>{props.comment.text}</div>
      <div className={cn("add")}>
        {!props.comment.showCommentForm ? (
          <>
          <div
            onClick={() => {
              props.toggleMainComment(false);
              props.changeShowForm(props.comment._id);
            }}
            className={cn("button")}
          >
            Ответить
          </div>
          </>
        ) : (
          <>
            <div
            onClick={() => {
              props.toggleMainComment(false);
              props.changeShowForm(props.comment._id);
            }}
            className={cn("button")}
          >
            Ответить
          </div>
          <AddNewComment
            header={"Новый ответ"}
            parent={props.comment}
            comment={props.comment}
            onCancel={() => {
              props.toggleMainComment(true);
              props.changeShowForm(props.comment._id, false);
            }}
            onSubmit={props.submitComment}
            createCommentOpen={props.comment.showCommentForm}
            token={props.token}
            description={props.description}
          />
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
key: propTypes.string,
comment: propTypes.object,
toggleMainComment: propTypes.func,
changeShowForm: propTypes.func,
submitComment: propTypes.func,
token: propTypes.string,
description: propTypes.node
}

export default React.memo(Comment);