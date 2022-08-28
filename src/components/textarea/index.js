import React, { useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function TextArea({ head, btnNewComment, parent, newComment }) {
  const cn = bem("Textarea");

  const [text, setText] = useState("");

  return (
    <div className={cn()}>
      <p>
        <b>{head}</b>
      </p>

      <textarea
        className={cn("comment")}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <input
        className={cn("submit")}
        type="submit"
        onClick={() =>
          text &&
          newComment(text, parent, btnNewComment ? "comment" : "article")
        }
      />
      {btnNewComment && btnNewComment}
    </div>
  );
}

export default React.memo(TextArea);
