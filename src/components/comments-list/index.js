import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ItemComment from "../../components/item-comment";
import "./styles.css";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      {props.comments.map((item) => (
        <ItemComment
          item={item}
          key={item._id}
          replies={props.getReplies(item._id)}
          getReplies={props.getReplies}
        />
      ))}
    </div>
  );
}

export default React.memo(CommentsList);
