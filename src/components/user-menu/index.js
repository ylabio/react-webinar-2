import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function UserMenu({ article, onAdd }) {
  // CSS классы по БЭМ
  const cn = bem("UserMenu");

  return (
    <div className={cn()}>
      <Link to={"/profile"}>name user</Link>
      <Link to={"/login"}>
        <button>Вход</button>
      </Link>
    </div>
  );
}

export default React.memo(UserMenu);
