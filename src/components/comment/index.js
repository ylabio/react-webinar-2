import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import parseDate from "../../utils/parse-date";
import ReplyCreate from "../reply-create";

function Comment({
  item,
  isLoggedIn,
  onReply,
  level,
  currentTargetId,
  currentTargetIsComment,
  currentTargetIsReply,
}) {
  const cn = bem("Comment");

  const dateCreate = parseDate(new Date(item.dateCreate));

  const onOpenReplyForm = () => {
    currentTargetIsReply(item._id);
  };

  const replies = item.children.map((item) => (
    <Comment
      item={item}
      key={item._id}
      isLoggedIn={isLoggedIn}
      onReply={onReply}
      level={level + 1}
      currentTargetId={currentTargetId}
      currentTargetIsComment={currentTargetIsComment}
      currentTargetIsReply={currentTargetIsReply}
    />
  ));

  return (
    <div className={cn()} style={{ marginLeft: level > 10 ? "0px" : "30px" }}>
      <div className={cn("header")}>
        <span className={cn("username")}>{item.author.profile.name}</span>
        <span className={cn("date")}>{dateCreate}</span>
      </div>
      <p className={cn("text")}>{item.text}</p>
      <button className={cn("reply")} onClick={onOpenReplyForm}>
        Ответить
      </button>
      <ReplyCreate
        onReply={onReply}
        commentId={item._id}
        isLoggedIn={isLoggedIn}
        currentTargetId={currentTargetId}
        onCancel={currentTargetIsComment}
      />
      {!!item.children.length && replies}
    </div>
  );
}

export default Comment;
