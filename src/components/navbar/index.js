import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function Navbar({ translate }) {
  const cn = bem("Navbar");

  return (
    <nav className={cn()}>
      <Link to="/catalog" className={cn("link")}>
        {translate.main.mainPage}
      </Link>
    </nav>
  );
}

Navbar.propTypes = {
  translate: propTypes.object.isRequired,
};

Navbar.defaultProps = {};

export default React.memo(Navbar);
