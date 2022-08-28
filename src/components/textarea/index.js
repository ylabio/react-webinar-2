import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function TextArea({ head }) {
  const cn = bem("Textarea");

  return (
    <div className={cn()}>
      <form>
        <p>
          <b>{head}</b>
        </p>

        <textarea className={cn("comment")}></textarea>

        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
}

export default React.memo(TextArea);
