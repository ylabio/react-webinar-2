import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Background() {
  const cn = bem("Background");

  return <div className={cn()}></div>;
}

export default Background;
