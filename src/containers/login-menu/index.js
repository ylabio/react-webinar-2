import React from "react";
import useSelector from "../../hooks/use-selector";
import LoginLinks from "../../components/login-links";

function LoginMenu() {

  const select = useSelector(state => ({
    login: state.login,
    user: state.login.user?.result.user,
    status: state.login.status,
  }));

  return (
    <LoginLinks status={select.status} user={select.user} />
  );
}

export default React.memo(LoginMenu);