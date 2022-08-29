import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Spinner from "../../components/spinner";
import "./styles.css";

function CommentList({ all, children, log, waiting }) {
  const cn = bem("Comments");

  return (
    <div className={log ? cn() : cn("nosession")}>
      <Spinner active={waiting}>
        <div className={cn("all")}>Комментарии ({all})</div>
      </Spinner>
      <div>{children}</div>
    </div>
  );
}

export default React.memo(CommentList);
