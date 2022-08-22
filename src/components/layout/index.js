import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import Auth from "../auth";

function Layout({ head, children }) {
  const cn = bem("Layout");

  return (
    <div className={cn()}>
      <div>{head}</div>
      <div className={cn("content")}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

Layout.defaultProps = {};

export default React.memo(Layout);
