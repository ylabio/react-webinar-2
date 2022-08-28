import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsCounter({ count }) {
  const cn = bem("CommentsCounter");

  return <div className={cn()}>Комментарии ({count || "0"})</div>;
}

CommentsCounter.propTypes = {
  count: propTypes.number,
};

CommentsCounter.defaultProps = {
  count: 0,
};

export default React.memo(CommentsCounter);
