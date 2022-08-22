import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function Header(props) {
  const cn = bem("Header");

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        {props.isLogged ? (
          <div>
            <Link className={cn("link")} to={"/profile"}>
              {props.name}
            </Link>{" "}
            <button onClick={props.logout}>Выход</button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button>Вход</button>
          </Link>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  isLogged: propTypes.bool,
  name: propTypes.string,
  logout: propTypes.func,
};

export default React.memo(Header);
