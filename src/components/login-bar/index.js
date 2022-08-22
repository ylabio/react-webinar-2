import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import LayoutFlex from "../layout-flex";
import "./style.css";

function LoginBar({ username, logout }) {
  const cn = bem("LoginBar");

  const content = !username ? (
    <Link to="/login">
      <button>Вход</button>
    </Link>
  ) : (
    <button onClick={logout}>Выход</button>
  );

  return (
    <div className={cn()}>
      <LayoutFlex flex={"end"}>
        <Link to="/profile">{username}</Link>
        {content}
      </LayoutFlex>
    </div>
  );
}

export default LoginBar;
