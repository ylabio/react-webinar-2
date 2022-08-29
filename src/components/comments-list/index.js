import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "styles.css";

const CommentsList = (props) => {
  let cn = bem("Comments-list");
  return (
    <div className={cn()}>
      <div className={cn("title")}>
        Комментарии ({props.internalComments.length})
      </div>
      {props.children}
    </div>
  );
};

CommentsList.propTypes = {
  internalComments: propTypes.array,
  children: propTypes.node,
};

export default React.memo(CommentsList);
