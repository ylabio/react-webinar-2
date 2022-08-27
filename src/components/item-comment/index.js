import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import CommentsList from "../comments-list";
import CommentForm from "../../components/comment-form";
import "./styles.css";

function ItemComment({
  item,
  replies,
  getReplies,
  isAuth,
  submit,
  submitLabel,
  canselLabel,
  activeComment,
  setActiveComment,
  parentId,
}) {
  const cn = bem("ItemComment");

  const isReplying = activeComment && activeComment === item._id;

  const formatDate = (date) => {
    let res =
      new Date(date)
        .toLocaleString("ru", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(/г\./, " ") +
      " в " +
      new Date(date).toLocaleString("ru", {
        hour: "numeric",
        minute: "numeric",
      });

    return res;
  };

  return (
    <div className={cn()}>
      <div className={cn("right")}>
        <div className={cn("name")}>{item.author?.profile?.name}</div>
        <div className={cn("date")}>{formatDate(item.dateCreate)}</div>
      </div>

      <div className={cn("text")}>{item.text}</div>
      <button
        onClick={() => setActiveComment(item._id)}
        className={cn("button")}
      >
        Ответить
      </button>
      {replies && (
        <div className={cn("replies")}>
          <CommentsList
            comments={replies}
            getReplies={getReplies}
            isAuth={isAuth}
            submit={submit}
            submitLabel={submitLabel}
            canselLabel={canselLabel}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            parentId={parentId}
          />
        </div>
      )}
      {isReplying && (
        <CommentForm
          id={item._id}
          type={item._type}
          isAuth={isAuth}
          submit={submit}
          submitLabel={submitLabel}
          canselLabel={canselLabel}
          hasCancelButton
          handleCancel={() => {
            setActiveComment(null);
          }}
          parentId={parentId}
        />
      )}
    </div>
  );
}

export default React.memo(ItemComment);
