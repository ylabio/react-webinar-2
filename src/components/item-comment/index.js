import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemComment(props) {
  const cn = bem("ItemComment");

  return (
    <div className={cn()} style={{ paddingLeft: props.lvl * 35 }}>
      <div className={cn("header")}>
        <span className={cn("author")}>{props.author}</span>
        <span className={cn("date")}>{props.date}</span>
      </div>
      <div className={cn("body")}>{props.text}</div>
      <div className={cn("actions")}>
        <button onClick={props.selectReplyId}>{props.labelReply}</button>
      </div>
      {props.replyComponent}
    </div>
  );
}

ItemComment.propTypes = {
  text: propTypes.string,
  author: propTypes.string,
  date: propTypes.string,
  lvl: propTypes.number,
  labelReply: propTypes.string,
  replyComponent: propTypes.node,
  selectReplyId: propTypes.func,
};

ItemComment.defaultProps = {
  text: "",
  author: "",
  date: "",
  lvl: 0,
  labelReply: "",
  replyComponent: null,
  selectReplyId: () => {},
};

export default React.memo(ItemComment);
