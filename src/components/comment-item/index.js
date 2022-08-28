import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "./styles.css";

function CommentItem({ item }) {
  const cn = bem("Comment");

  return (
    <div
      style={{ paddingLeft: `${(item.parent._tree.length - 1) * 20}px` }}
      className={cn()}
    >
      <div className={cn("name")}>
        <h5>{item.author.profile.name}</h5>{" "}
        <span>
          {dayjs(item.dateCreate).locale("ru").format("D MMMM YYYY в h:mm")}
        </span>
      </div>
      <div className={cn("text")}>{item.text}</div>
      <div className={cn("answer")}>
        <p>Ответить</p>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
