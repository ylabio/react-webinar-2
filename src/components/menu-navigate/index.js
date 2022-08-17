import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import propTypes from "prop-types";

function MenuNavigate({ lang }) {
  return (
    <nav className="MenuNavigate">
      <Link to="/" className="MenuNavigate__link">
        {lang.main}
      </Link>
    </nav>
  );
}

MenuNavigate.propTypes = {
  lang: propTypes.object.isRequired,
};

export default memo(MenuNavigate);
