import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

function Layout({ head, children, modal, componentModal }) {
  const cn = bem("Layout");

  return (
    <div className={cn()}>
      <div className={cn("wrapper", { none: modal })}>
        <div className={cn("head")}>{head}</div>
        <div className={cn("content")}>{children}</div>
      </div>
      <div className={cn("modal", { onModal: modal })}>{componentModal}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  componentModal: propTypes.node,
  modaL: propTypes.bool,
};

Layout.defaultProps = {
  modal: false,
};

export default React.memo(Layout);
