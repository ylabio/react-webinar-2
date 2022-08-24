import propTypes from 'prop-types';
import React, {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import LayoutFlex from '../../components/layouts/layout-flex';
import LoginControls from '../../components/login/login-controls';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function CommonTopbar({redirectPage, pageId}) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    username: state.profile.name,
    isSigned: state.session.isSigned
  }));

  const callbacks = {
    onLoginClick: useCallback(
      url => navigate(url, {state: {redirect: redirectPage, id: pageId}}),
      [redirectPage]
    ),
    onLogoutClick: useCallback(() => store.get('auth').logout(), [])
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
        onLogout={callbacks.onLogoutClick}
        loginUrl={`/login`}
      ></LoginControls>
    </LayoutFlex>
  );
}

CommonTopbar.propTypes = {
  redirectPage: propTypes.string,
  pageId: propTypes.string
};

CommonTopbar.defaultProps = {
  redirectPage: 'profile',
  pageId: null
};

export default React.memo(CommonTopbar);
