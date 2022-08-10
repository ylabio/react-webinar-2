import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Modal = ({ children }) => {
  const cn = bem("Modal");
  return <div className={cn()}>{children}</div>;
};

export default Modal;
