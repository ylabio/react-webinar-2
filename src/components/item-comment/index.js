import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./styles.css";

function ItemComment({ item, replies, getReplies }) {
  const cn = bem("ItemComment");

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
      <button>Ответить</button>
      {replies && (
        <div className={cn("replies")}>
          {replies.map((reply) => (
            <ItemComment item={reply} key={reply._id} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(ItemComment);
