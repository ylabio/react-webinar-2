import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import LayoutFlex from "../layout-flex";
import "./style.css";

function LoginBar() {
  const cn = bem("LoginBar");

  return (
    <div className={cn()}>
      <LayoutFlex flex={"end"}>
        <Link to="/login">
          <button>Вход</button>
        </Link>
      </LayoutFlex>
    </div>
  );
}

export default LoginBar;
