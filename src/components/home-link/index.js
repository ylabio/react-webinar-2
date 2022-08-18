import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const HomeLink = () => {
  return (
    <div>
      <Link className="homeLink" to="/">
        Главная
      </Link>
    </div>
  );
};

export default HomeLink;
