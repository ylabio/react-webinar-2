import React, {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import LayoutFlex from '../../components/layouts/layout-flex';
import LoginControls from '../../components/login/login-controls';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function CommonTopbar() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    username: state.auth.username,
    isSigned: state.auth.isSigned
  }));

  const callbacks = {
    onLoginClick: useCallback(url => navigate(url))
  };

  const {t, lang} = useTranslate();

  const text = useMemo(
    () => ({
      login: t('login'),
      logout: t('logout')
    }),
    [lang]
  );

  return (
    <LayoutFlex flex='end'>
      <LoginControls
        text={text}
        username={select.username}
        isSigned={select.isSigned}
        onLogin={callbacks.onLoginClick}
      ></LoginControls>
    </LayoutFlex>
  );
}

export default React.memo(CommonTopbar);
