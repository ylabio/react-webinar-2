import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

const LayoutProfile = ({ head, children }) => {
  const cn = bem("LayoutProfile");

  return (
    <div className={cn()}>
      <div className={cn("head")}>{head}</div>
      <div className={cn("content")}>{children}</div>
    </div>
  );
};

LayoutProfile.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

LayoutProfile.defaultProps = {};

export default React.memo(LayoutProfile);
