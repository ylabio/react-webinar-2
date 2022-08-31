import React from "react";
import propTypes from "prop-types";
import "./style.css";

function CommentsTitle({count}) {

  return (
    <div className="CommentsTitle">
      <h2>Комментарии ({count})</h2>
    </div>
  )
}

CommentsTitle.propTypes = {
  count: propTypes.number,
}

CommentsTitle.defaultProps = {
  count: 0,
}

export default React.memo(CommentsTitle);
