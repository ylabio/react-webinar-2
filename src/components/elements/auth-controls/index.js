import React from "react";
import {Link} from "react-router-dom";
import './style.css';
import propTypes from "prop-types";

const AuthControls = ({link, onLogout, waiting, t}) => {
    return (
    <div className={"AuthControls"}>
        <Link className={"AuthControls-link"} to={link.to}>{link.name}</Link>
        <button onClick={onLogout} disabled={waiting}>{t("nav.logout")}</button>
    </div>
    );
};

AuthControls.propTypes = {
  link: propTypes.object.isRequired,
  onLogout: propTypes.func,
  waiting: propTypes.bool,
  t: propTypes.func,
}

AuthControls.defaultProps = {
  onLogout: () => {},
  waiting: false,
  t: (text) => text,
}

export default React.memo(AuthControls);
