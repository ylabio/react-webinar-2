import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';
import LoginForm from '../../components/login-form';

function LoginFormContainer({ 
  login, 
  navigate, 
  errorMsg, 
  clearErrorMsg, 
  user 
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const callbacks = {
    login: () => {
      const usernameLength = username.trim().length;
      const passwordLength = password.trim().length;
      if (usernameLength && passwordLength) {
        login(username, password);
      }
    },
  };

  useEffect(() => {
    let id;

    if (errorMsg) {
      setShowAlert(true);
      id = setTimeout(() => {
        setShowAlert(false);
        clearErrorMsg();
      }, 2000);
    }

    if (user) {
      navigate();
    }

    return () => clearTimeout(id);
  }, [errorMsg, user])

  return (
    <LoginForm 
      errorMsg={errorMsg}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      login={callbacks.login}
      showAlert={showAlert}
    />
  );
}

LoginForm.propTypes = {
  login: propTypes.func.isRequired,
  navigate: propTypes.func,
  clearErrorMsg: propTypes.func,
  errorMsg: propTypes.string.isRequired,
  user: propTypes.object,
};

LoginForm.defaultProps = {
  user: null,
  navigate: () => {},
  clearErrorMsg: () => {},
};

export default React.memo(LoginFormContainer);

