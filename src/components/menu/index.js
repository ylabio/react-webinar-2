import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Menu({ link, title }) {
  const cn = bem("Menu");

  return (
    <div className={cn()}>
      <Link to={link}>{title}</Link>
    </div>
  );
}

export default React.memo(Menu);
