import React from "react";
import propTypes from "prop-types";
import { cn as bem } from '@bem-react/classname'
import './style.css';
import { Link } from "react-router-dom";

function LoginHead(props) {
  const cn = bem('Login');

  return (
    <div className={cn()}>
      <Link to={props.toSelf}>{props.name}</Link>
      <Link to={props.toLog}>
        <button onClick={props.signOut}>
          {props.buttonText}
        </button>
      </Link>
    </div>
  );
}

LoginHead.propTypes = {
  toLog: propTypes.string,
  toSelf: propTypes.string,
  name: propTypes.string,
  signOut: propTypes.func,
  buttonText: propTypes.string
}

LoginHead.defaultProps = {
  toLog: "/login",
  name: "",
  toSelf: `/profile/name`,
  signOut: () => { },
  buttonText: ""
}

export default React.memo(LoginHead);
