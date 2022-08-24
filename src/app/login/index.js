import React, { useCallback } from "react";
import Header from "../../containers/header";
import Layout from "../../components/layout";
import SignIn from "../../components/sign-in";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function Login() {
  const store = useStore();

  const select = useSelector((state) => ({
    name: state.profile.name,
    password: state.profile.password,
    error: state.profile.error,
    loggedIn: state.profile.loggedIn,
  }));

  const callbacks = {
    onChange: useCallback((e) => store.get("profile").handleChangeLogin({ [e.target.name]: e.target.value }), []),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      store.get("profile").login();
    }, []),
  };

  return (
    <Layout head={<Header />}>
      <Tools />
      <SignIn
        login={select.login}
        password={select.password}
        onChange={callbacks.onChange}
        onSubmit={callbacks.onSubmit}
        error={select.error}
      />
    </Layout>
  );
}

export default Login;
