import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import { AuthContext } from "../../store/authcontext";
import './style.css';

function LoginPage() {

    const {t} = useTranslate();
    const { logIn } = useContext(AuthContext);
      
    const options = {
      loginform: useMemo(() => ({ enter: t('loginform.enter'), inputname: t('loginform.inputname'), inputpassword: t('loginform.password'), login: t('inputform.login') }), [t]),
      loginMenu: useMemo(() => ({ loginTitle: t('tologin'), login: t('login'), logOutTitle: t('logout') }), [t]),
    }

  const LoginForm = () => {
    const cn = bem('LoginForm');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate(); 
    const localStorageUser = localStorage.user && JSON.parse(localStorage.user);

    const handleSubmit = (event) => {
      event.preventDefault();
      try {
        logIn(password, name);
        navigate(`/users/${localStorageUser._id}`)
      } catch(err) {
        setErr(err.message);
      }
    }
  
    return (    
      <form className={(cn())} onSubmit={handleSubmit}>
        <h3 className={(cn('header'))}>{options.loginform.enter}</h3>
        <label className={(cn('label'))}>
          {options.loginform.inputname}
          <input className={(cn('input'))}
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={(cn('label'))}>
          {options.loginform.inputpassword}
          <input className={(cn('input'))}
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input className={(cn('inputButton'))} type="submit" value={options.loginform.login} />
        {err && <div className={(cn('err'))}>{err}</div>}
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

