import React, { useCallback } from 'react';
import CommonLayout from '../../containers/common-layout';
import LoginForm from '../../components/forms/login-form';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const { waiting, errors } = useSelector((s) => s.user);
  const cb = {
    onSignIn: useCallback((data) => {
      store.get('user').onSignIn(data, () => navigate( -1, {replace: true}));
    }, []),
  };

  return (
    <CommonLayout>
      <LoginForm t={t} onSubmit={cb.onSignIn} waiting={waiting} errors={errors}/>
    </CommonLayout>
  );
};

export default SignIn;
