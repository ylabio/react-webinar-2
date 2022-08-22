import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import propTypes from "prop-types";
import useTranslate from '../../hooks/use-translate';
import HeadLogin from '../../components/head-login';
import useSelector from '../../hooks/use-selector';
import useInit from "../../hooks/use-init";
import HeadLogout from '../../components/head-logout';

const Auth = () => {

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector((state) => ({
    token: state.auth.token,
    user: state.auth.user,
    isLogin: state.auth.isLogin
  }));

  
  const callbacks = {
    logout: useCallback((token) => store.get('auth').logout(token), []),
  };

  return (
      <>
      {select.isLogin
        ?<HeadLogin t={t}           
          logout={callbacks.logout}
          name={localStorage.getItem("userName")}
          token={select.token}/>
        :<HeadLogout  t={t} />
      }
      </>
  );
};

Auth.propTypes = {
  t: propTypes.func,
};

Auth.defaultProps = {
  t: (text) => text,
};

export default React.memo(Auth);