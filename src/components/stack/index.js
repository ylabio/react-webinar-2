import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "style.css";

const Stack = ({ children, px, py, spacing, direction, className }) => {
  const cn = bem("Stack");

  return (
    <div className={ (className ? `${className} ` : "") + cn({ px, py, spacing, direction })}>
      {children}
    </div>
  );
};

Stack.propTypes = {
  children: propTypes.node.isRequired,
  px: propTypes.oneOf(["none", "small", "normal", "large"]),
  py: propTypes.oneOf(["none", "small", "normal", "large"]),
  spacing: propTypes.oneOf(["none", "small", "normal", "large"]),
  direction: propTypes.oneOf(["column", "row"]),
  className: propTypes.string,
};

Stack.defaultProps = {
  px: "none",
  py: "none",
  spacing: "none",
  direction: "column",
};

export default React.memo(Stack);
