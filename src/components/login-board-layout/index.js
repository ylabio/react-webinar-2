import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";
import "./style.css";

function LoginBoardLayout({ user, logOut, logIn, isAuth, t }) {
  const cn = bem("LoginBoardLayout");
  const navigate = useNavigate();

  const callbacks = {
    logOut: useCallback((e) => logOut(), [logOut]),
  };

  return (
    <div className={cn()}>
      {isAuth ? (
        <>
          <span className={cn("link")} onClick={() => navigate("/profile")}>
            {user.profile.name}
          </span>
          <button onClick={callbacks.logOut}>{t("log.out")}</button>
        </>
      ) : (
        <button onClick={logIn}>{t("log.in")}</button>
      )}
    </div>
  );
}

LoginBoardLayout.propTypes = {
  user: propTypes.object,
  logOut: propTypes.func,
  isAuth: propTypes.bool,
  t: propTypes.func,
};

LoginBoardLayout.defaultProps = {
  isAuth: false,
  logOut: () => {},
  user: {},
  t: () => {},
};

export default React.memo(LoginBoardLayout);
