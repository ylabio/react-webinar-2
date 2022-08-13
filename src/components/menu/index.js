import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Menu(props) {
  return (
    <div className="Main">
      <Link to={"/"}>Главная</Link>
    </div>
  );
}

export default React.memo(Menu);
