import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import translation from "../../utils/translation";

function Menu(props) {
  return (
    <div className="Main">
      <Link to={"/"}>{translation(props.lng, "main")}</Link>
    </div>
  );
}

export default React.memo(Menu);
