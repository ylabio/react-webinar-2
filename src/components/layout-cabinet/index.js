import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Cabinet({ children, head }) {
  const cn = bem("Cabinet");

  return (
    <div className={cn()}>
      <h1>{head}</h1>
      {children}
    </div>
  );
}

export default React.memo(Cabinet);
