import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Background(props) {
  const cn = bem("Background");

  return <div className={cn()} onClick={props.onClick}></div>;
}

export default Background;
