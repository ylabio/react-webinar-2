import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ItemComment from "../item-comment";
import "./styles.css";

function CommentsList(props) {
  const cn = bem("CommentsList");
  console.log(props.isAuth);

  return (
    <div className={cn()}>
      {props.comments.map((item) => (
        <ItemComment
          item={item}
          key={item._id}
          replies={props.getReplies(item._id)}
          getReplies={props.getReplies}
          isAuth={props.isAuth}
          submit={props.submit}
          submitLabel={props.submitLabel}
          activeComment={props.activeComment}
          setActiveComment={props.setActiveComment}
          parentId={props.parentId}
          canselLabel={props.canselLabel}
        />
      ))}
    </div>
  );
}

export default React.memo(CommentsList);
