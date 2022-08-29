import React, { useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function TextArea({ head, setArea, parent, newComment }) {
  const cn = bem("Textarea");

  const [text, setText] = useState("");

  return (
    <div className={setArea ? cn() : cn("fix")}>
      <p>
        <b>{head}</b>
      </p>

      <textarea
        className={cn("comment")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        className={cn("submit")}
        type="submit"
        onClick={() => {
          text && newComment(text, parent, setArea ? "comment" : "article");
          setText("");
          setArea(0);
        }}
      />
      {setArea && (
        <input type="button" value="Отмена" onClick={() => setArea(0)} />
      )}
    </div>
  );
}

export default React.memo(TextArea);
