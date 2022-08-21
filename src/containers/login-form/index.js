import React, {useCallback} from 'react';
import Input from '../../components/common/input';
import LayoutForm from '../../components/layouts/layout-form';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function LoginForm() {
  const {t} = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    login: state.auth.login,
    isSigned: state.auth.isSigned
  }));

  const callbacks = {
    onLoginChange: useCallback(username => store.get('auth').setLoginData({username}), []),
    onPasswordChange: useCallback(password => store.get('auth').setLoginData({password}), []),
    onSubmit: useCallback(async () => {
      store.get('auth').login();
      store.get('auth').clearInputFields();
    }, [])
  };

  return (
    <LayoutForm
      head={<h2>{t('login-form.head')}</h2>}
      submitText={t('submit.login')}
      onSubmit={callbacks.onSubmit}
      error={select.login.error}
    >
      <Input
        id={'login-input'}
        label={t('login.label')}
        value={select.login.username}
        onChange={callbacks.onLoginChange}
      />
      <Input
        id={'password-input'}
        label={t('password.label')}
        value={select.login.password}
        onChange={callbacks.onPasswordChange}
      />
    </LayoutForm>
  );
}

export default React.memo(LoginForm);
