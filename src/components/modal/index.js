import React from "react";
import "./sryle.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

const Modal = ({ children }) => {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("content")}>{children}</div>
    </div>
  );
};

export default React.memo(Modal);

Modal.propType = {
  children: propTypes.element,
};

Modal.defaultProps = {
  children: <></>,
};
