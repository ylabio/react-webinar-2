import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function Navbar({ firstPage }) {
  const cn = bem("Navbar");
  return (
    <div className={cn()}>
      <div className={cn("links")}>
        <Link className={cn("main")} to={"/"} onClick={firstPage}>
          Главная
        </Link>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  firstPage: propTypes.func,
};

Navbar.defaultProps = {
  firstPage: () => {},
};

export default React.memo(Navbar);
