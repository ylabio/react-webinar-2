import React, {useCallback} from 'react';
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
    signOut: useCallback(() => store.get('login').signOut())
  };

  // write render functions for buttons
  return (
    <LayoutFlex flex="end">
      <div>
        {select.user.profile && (
          <Link to={'/profile'}>{select.user.profile.name}</Link>
        )}
      </div>
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        Вход
      </button>
    </LayoutFlex>
  );
}

export default React.memo(LoginTools);
