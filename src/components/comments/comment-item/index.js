import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentItem({ item, level, onReply, renderReply, replyIsOpen }) {
  const cn = bem("CommentItem");

  const callbacks = {
    reply: useCallback(
      (e) => {
        onReply(item._id);
      },
      [onReply, item]
    ),
  };

  return (
    <div className={cn()} style={{ paddingLeft: (level - 1) * 35 }}>
      <div className={cn("head")}>
        <span className={cn("user")}>{item.author.profile.name}</span>
        <span className={cn("date")}>{item.dateCreate}</span>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <button className={cn("actions")} onClick={callbacks.reply}>
        Ответить
      </button>
      {item.isReplying && replyIsOpen && renderReply(item._id, "comment")}
    </div>
  );
}

CommentItem.propTypes = {
  item: propTypes.object.isRequired,
  onReply: propTypes.func.isRequired,
};

CommentItem.defaultProps = {
  //   onAdd: () => {},
  //   labelCurr: "₽",
  //   labelAdd: "Добавить",
};

export default React.memo(CommentItem);
