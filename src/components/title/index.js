import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Title({ children }) {
  // CSS классы по БЭМ
  const cn = bem("Title");

  return <h2 className={cn()}>{children}</h2>;
}

Title.propTypes = {
  children: propTypes.node.isRequired,
};

Title.defaultProps = {};

export default React.memo(Title);
