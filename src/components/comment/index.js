import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import parseDate from "../../utils/parse-date";
import ReplyCreate from "../reply-create";
import { Link } from "react-router-dom";

function Comment({ item, isLoggedIn, onReply }) {
  const cn = bem("Comment");

  const dateCreate = parseDate(new Date(item.dateCreate));

  const replies = item.children.map((item) => (
    <Comment item={item} key={item._id} isLoggedIn={isLoggedIn} />
  ));

  const replyCommentForm = isLoggedIn ? (
    <ReplyCreate onReply={onReply} commentId={item._id} />
  ) : (
    <div style={{ marginTop: "30px" }}>
      <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
      <button className={cn("cancelReply")}>Отмена</button>
    </div>
  );

  return (
    <div className={cn()}>
      <div className={cn("header")}>
        <span className={cn("username")}>{item.author.profile.name}</span>
        <span className={cn("date")}>{dateCreate}</span>
      </div>
      <p className={cn("text")}>{item.text}</p>
      <button className={cn("reply")}>Ответить</button>
      {replyCommentForm}
      {!!item.children.length && replies}
    </div>
  );
}

export default Comment;
