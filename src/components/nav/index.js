import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./styles.css";

function Nav() {
  const cn = bem("Nav");

  return (
    <div className={cn()}>
      <Link to="/">Главная</Link>
    </div>
  );
}

export default Nav;
