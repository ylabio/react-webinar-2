import React from "react";
import useSelector from "../../hooks/use-selector";

function CommentsContainer() {
  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  return <div>{select.exists && "comments"}</div>;
}

export default React.memo(CommentsContainer);
