import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {saveToken} from '../../services/token';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Login from "../../components/auth";
import api from '../../services/api';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate(); 

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  const callbacks = {
    onSubmit: useCallback(async (evt) => {
      evt.preventDefault();
      try {
        const response = await api.post('/users/sign', {login, password});
        saveToken(response.data.result.token)
        navigate(`/profile`);
      } catch (error) {
        setError(true)
      }
    }, [login, password]),
  };

  return (
    <Login 
      isError={isError}
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
