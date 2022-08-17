import React from "react";
import { cn as bem } from "@bem-react/classname";
import { NavLink } from "react-router-dom";
import "./style.css";

function Menu() {
  const cn = bem("Menu");

  return (
    <nav className={cn()}>
      <ul className={cn("list")}>
        <li>
          <NavLink to="/" className={cn("link")}>
            Главная
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Menu);
