import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';
import {Link} from "react-router-dom";

function LoginPanel(props) {
  const cn = bem('LoginPanel');

  return (
    <div className={cn()}>
      {props.userExists && <Link to={props.toProfile}>{props.userName}</Link>}
      <button onClick={props.log}>{props.title}</button>
    </div>
  )
}

LoginPanel.propTypes = {
  log: propTypes.func,
  title: propTypes.string,
  userExists: propTypes.bool,
  userName: propTypes.string,
}

LoginPanel.defaultProps = {
  log: () => {},
  title: 'btn',
  userExists: 'false',
  userName: 'noName',
}

export default React.memo(LoginPanel);
