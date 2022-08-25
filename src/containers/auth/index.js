import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Login from "../../components/auth";

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [textError, setTextError] = useState('');
  const callbacks = {
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      try {
        await store.get('user').setToken(login, password)
        window.history.length > 2 ? 
          window.history.back() :
          navigate(`/profile`);
        } catch (error) {
        setTextError(error.message)
        }
    }, [login, password]),
  };

  return (
    <Login 
      textError={textError}
      login={login}
      setLogin={setLogin}
      password={password} 
      setPassword={setPassword} 
      handleSubmit={callbacks.onSubmit}
      t={t}
    />
  );
}

export default React.memo(Auth);
