import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function UserControls({ user, onLogout, t }) {
  const cn = bem("UserControls");
  return (
    <div className={cn()}>
      {user.username ? (
        <>
          <Link to="/profile">{user.profile?.name}</Link>
          <button onClick={onLogout}>{t("user.logout")}</button>
        </>
      ) : (
        <Link to="/login">
          <button>{t("user.login")}</button>
        </Link>
      )}
    </div>
  );
}

UserControls.propTypes = {
  user: propTypes.object.isRequired,
  onLogout: propTypes.func.isRequired,
  t: propTypes.func,
};

UserControls.defaultProps = {
  t: (text) => text,
};

export default React.memo(UserControls);
