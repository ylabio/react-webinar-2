import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";
import useTranslate from "../../utils/use-translate";

function Navbar() {
  const cn = bem("Navbar");
  const t = (phrase) => useTranslate(phrase);

  return (
    <nav className={cn()}>
      <Link to="/catalog" className={cn("link")}>
        {t("main.mainPage")}
      </Link>
    </nav>
  );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default React.memo(Navbar);
