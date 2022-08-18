import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Menu({ links }) {
  const cn = bem("Menu");

  return (
    <div className={cn()}>
      {links.map((item, index) => (
        <Link key={index} to={item.link}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default React.memo(Menu);
