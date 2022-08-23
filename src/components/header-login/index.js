import React from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "styles.css";

const HeaderLogin = (props) => {
  let cn = bem("HeaderLogin");

  return (
    <div className={cn()}>
    {props.user.logined ?
    <>
    <Link to={"/profile"}>
      <div className={cn("name")}>{props.user?.user?.profile?.name}</div>
    </Link>
    <button onClick={props.logout}>Выход</button>
    </>
    :
    <Link to={"/login"}><button>Вход</button></Link>}
    </div>
  )
}

HeaderLogin.prototype = {
  user: propTypes.object,
  logout: propTypes.func
}

export default React.memo(HeaderLogin)