import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsCounter({ count, t }) {
  const cn = bem("CommentsCounter");

  return (
    <div className={cn()}>
      {t("comments.count")} ({count || "0"})
    </div>
  );
}

CommentsCounter.propTypes = {
  count: propTypes.number,
  t: propTypes.func.isRequired,
};

CommentsCounter.defaultProps = {
  count: 0,
};

export default React.memo(CommentsCounter);
