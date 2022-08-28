import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Reply(props) {
  const cn = bem("Reply");

  const [value, change] = useState("");
  const onChange = useCallback(
    (event) => {
      change(event.target.value);
    },
    [change]
  );

  return (
    <div className={cn()}>
      <div className={cn("header")}>
        {props.mode === "default" && props.t("comment.newReply")}
        {props.mode === "new" && props.t("comment.newComment")}
      </div>
      <textarea value={value} onChange={onChange} />
      <div className={cn("actions")}>
        <button onClick={() => props.post(props._id, props.type, value)}>
          {props.t("comment.send")}
        </button>
        {props.mode === "default" && (
          <button onClick={props.resetReplyId}>
            {props.t("comment.cancel")}
          </button>
        )}
      </div>
    </div>
  );
}

Reply.propTypes = {
  _id: propTypes.string,
  mode: propTypes.oneOf(["default", "new"]),
  type: propTypes.string,
  t: propTypes.func,
};

Reply.defaultProps = {
  mode: "default",
  onChange: () => {},
  t: (title) => title,
};

export default React.memo(Reply);
