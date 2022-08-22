import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import { AuthContext } from "../../store/authcontext";

function LoginPage() {

    const {t} = useTranslate();
    const navigate = useNavigate()
    const { user, logIn } = useContext(AuthContext);
    const [err, setErr] = useState(null);

    const options = {
        loginMenu: useMemo(() => ({ loginTitle: t('tologin'), loginName: t('login.name'), login: t('login'), logOutTitle: t('logout'), password: t('password') }), [t]),
    }

  const LoginForm = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      try {
        logIn(password, name);
        navigate(`/users/${user._id}`)
      } catch(err) {
        setErr(err.message);
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>{options.loginMenu.loginName}
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>{options.loginMenu.password}
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value={options.loginMenu.loginName} />
        {err && <div>{err}</div>}
      </form>
    )
  }
  return (
    <>
      
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <LoginForm />
      </Layout>
    </>

  )
}

export default React.memo(LoginPage);

