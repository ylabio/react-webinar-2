import React, {useCallback, useState} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Login from "../../components/auth";

function Auth() {
  const store = useStore();
  const {t} = useTranslate(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [textError, setTextError] = useState('');
  const callbacks = {
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      try {
        await store.get('user').setToken(login, password)
        window.history.back()
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
