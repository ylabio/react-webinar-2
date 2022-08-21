import propTypes from 'prop-types';
import React, {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/common/input';
import LayoutForm from '../../components/layouts/layout-form';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function LoginForm({redirectPage, pageId}) {
  const {t} = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (select.isSigned) {
      const page = redirectPage ? redirectPage : '';
      const id = pageId ? '/' + pageId : '';
      navigate(`/${page}${id}`);
    }
  }, [select.isSigned]);
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

LoginForm.propTypes = {
  redirectPage: propTypes.string,
  pageId: propTypes.string
};

export default React.memo(LoginForm);
