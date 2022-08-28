import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import parseDate from "../../utils/parse-date";

function Comment({ item }) {
  const cn = bem("Comment");

  const dateCreate = parseDate(new Date(item.dateCreate));

  return (
    <div className={cn()}>
      <div className={cn("header")}>
        <span className={cn("username")}>{item.author.profile.name}</span>
        <span className={cn("date")}>{dateCreate}</span>
      </div>
      <p className={cn("text")}>{item.text}</p>
      <button className={cn("reply")}>Ответить</button>
    </div>
  );
}

export default Comment;
