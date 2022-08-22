import React, {useCallback, useMemo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LayoutFlex from '../../components/layout-flex';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function LoginTools() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.user.currentUser,
    isAuthorized: state.login.isAuthorized
  }));

  const callbacks = {
    // выход пользователя
    signOut: useCallback(() => store.get('login').signOut(), []),
    // переход на страницу входа пользователя
    goToSignInForm: useCallback(() => {
      navigate('/login');
    }, [])
  };

  const button = useMemo(
    () =>
      select.isAuthorized ? (
        <button onClick={callbacks.signOut}>Выход</button>
      ) : (
        <button onClick={callbacks.goToSignInForm}>Вход</button>
      ),
    [select.isAuthorized]
  );

  return (
    <LayoutFlex flex="end">
      <div>
        {select.user.profile && (
          <Link to={'/profile'}>{select.user.profile.name}</Link>
        )}
      </div>
      {button}
    </LayoutFlex>
  );
}

export default React.memo(LoginTools);
