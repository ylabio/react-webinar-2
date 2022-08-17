import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function Menulink() {
  const cn = bem("Navlink");
  return (
    <div>
      <p className={cn()}>
        <Link to={"/"}>Главная</Link>
      </p>
    </div>
  );
}
export default React.memo(Menulink);
