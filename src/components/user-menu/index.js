import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function UserMenu({ userName, title, t, reset }) {
  // CSS классы по БЭМ
  const cn = bem("UserMenu");

  return (
    <div className={cn()}>
      {userName && <Link to={"/profile"}>{userName?.username || "User"}</Link>}
      <Link to={"/login"}>
        <button className={cn("login")} onClick={userName && reset}>
          {t(`userMenu.${title}`)}
        </button>
      </Link>
    </div>
  );
}

UserMenu.propTypes = {
  t: propTypes.func,
};

export default React.memo(UserMenu);
