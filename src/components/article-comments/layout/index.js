import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Layout({ children }) {

  // CSS классы по БЭМ
  const cn = bem("Comments");

  return (
    <div className={cn()}>
      { children }
    </div>
  );
}

Layout.propTypes = {
};

Layout.defaultProps = {
};

export default React.memo(Layout);
