import React, {useCallback} from 'react';
import LoginForm from '../../components/login-form';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

const LoginFormContainer = () => {
  const store = useStore();

  const callbacks = {
    logIn: useCallback((login, password) => store.get('profile').login(login, password), [])
  };

  const select = useSelector(state => ({error: state.profile.error}));

  return (
    <LoginForm logIn={callbacks.logIn} error={select.error}/>
  );
};

export default React.memo(LoginFormContainer);