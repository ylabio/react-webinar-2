import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentItem({
  item,
  date,
  level,
  onReply,
  renderReply,
  replyIsOpen,
  t,
}) {
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
        <span className={cn("date")}>{date}</span>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <button className={cn("actions")} onClick={callbacks.reply}>
        {t("comment.reply")}
      </button>
      {item.isReplying && replyIsOpen && renderReply(item._id, "comment")}
    </div>
  );
}

CommentItem.propTypes = {
  item: propTypes.object.isRequired,
  date: propTypes.string.isRequired,
  level: propTypes.number.isRequired,
  onReply: propTypes.func.isRequired,
  renderReply: propTypes.func,
  replyIsOpen: propTypes.bool,
  t: propTypes.func.isRequired,
};

CommentItem.defaultProps = {
  renderReply: (item) => {
    return item.toString();
  },
  replyIsOpen: false,
};

export default React.memo(CommentItem);
