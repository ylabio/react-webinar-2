import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function Background({ onClick }) {
  const cn = bem("Background");

  return <div className={cn()} onClick={onClick}></div>;
}

Background.propTypes = {
  onClick: propTypes.func,
};

export default React.memo(Background);
