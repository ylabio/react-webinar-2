import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function Menu(props) {
  const cn = bem("Menu");
  return (
    <div className={cn()}>
      <Link className={cn("link")} to="/">
        Главная
      </Link>
    </div>
  );
}

export default React.memo(Menu);
