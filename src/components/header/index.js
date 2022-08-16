import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Header({ children }) {
  const cn = bem("Header");

  return (
    <div className={cn()}>
      <div className={cn("content")}>{children}</div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: "",
};

export default React.memo(Header);
