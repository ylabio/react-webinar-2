import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import CommentForm from "../comment-form";
import "./styles.css";

function ItemComment({
  item,
  replies,
  getReplies,
  isAuth,
  submit,
  submitLabel,
  title,
  canselLabel,
  activeComment,
  setActiveComment,
  onSignIn,
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
      {replies &&
        replies.map((item) => (
          <ItemComment
            item={item}
            key={item._id}
            replies={getReplies(item._id)}
            getReplies={getReplies}
            isAuth={isAuth}
            submit={submit}
            submitLabel={submitLabel}
            title={title}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            canselLabel={canselLabel}
            onSignIn={onSignIn}
          />
        ))}
      {isReplying && (
        <CommentForm
          id={item._id}
          type={item._type}
          isAuth={isAuth}
          submit={submit}
          submitLabel={submitLabel}
          title={title}
          canselLabel={canselLabel}
          hasCancelButton
          handleCancel={() => {
            setActiveComment(null);
          }}
          onSignIn={onSignIn}
        />
      )}
    </div>
  );
}

export default React.memo(ItemComment);
