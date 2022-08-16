import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function LayoutMenu({ children }) {
  const cn = bem("LayoutMenu");

  return <div className={cn()}>{children}</div>;
}

LayoutMenu.propTypes = {
  children: propTypes.node,
};

LayoutMenu.defaultProps = {};

export default React.memo(LayoutMenu);
