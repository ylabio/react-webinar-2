import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Spacing({ children, mode }) {
  // CSS классы по БЭМ
  const cn = bem("Spacing");

  return <div className={cn(mode)}>{children}</div>;
}

Spacing.propTypes = {
  children: propTypes.node,
  mode: propTypes.oneOf(["default", "content"]),
};

Spacing.defaultProps = {
  mode: "default",
};

export default React.memo(Spacing);
