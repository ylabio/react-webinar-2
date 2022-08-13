import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function Spinner() {
  const cn = bem("Spinner");
  return (
    <div className={cn()}>
      <svg className={cn('item')} viewBox="0 0 50 50">
        <circle className={cn('path')} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>    
  );
}

export default Spinner;
