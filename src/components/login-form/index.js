import React, { useCallback, useState } from "react"
import { cn as bem } from "@bem-react/classname";
import "./style.css"
import useTranslate from "../../hooks/use-translate";
import propTypes from 'prop-types';

function Form(props) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const { t } = useTranslate();
  const callbacks = {
    setAuth: useCallback(() => props.getToken(login, pass), [login, pass])
  }
  const cn = bem('Form');
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>
        {t('login.title')}
      </h2>
      <div className={cn("input")}>
        <p>{t('login')}</p>
        <input value={login} onChange={e => setLogin(e.target.value)} />
      </div>
      <div className={cn("input")}>
        <p>{t('pass')}</p>
        <input value={pass} onChange={e => setPass(e.target.value)} />
      </div>
      <div className={cn("error")}>
        <p>{props.error}</p>
      </div>
      <button className={cn("button")} onClick={callbacks.setAuth}>
        {t('login.button')}
      </button>
    </div>
  )
}
Form.propTypes = {
  getToken: propTypes.func.isRequired,
  error: propTypes.string
}

Form.defaultProps = {
  error: ""
}

export default Form
