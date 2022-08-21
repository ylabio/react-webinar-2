import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import {Link, useLocation, useNavigate} from "react-router-dom";


function TopContainer() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();

  const callbacks = {
    // Открытие корзины
    goLogin: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  return (
    <LayoutFlex flex="end" indent="small">
      <Link to="/profile">{'User_1'}</Link>
      <button onClick={callbacks.goLogin}>{t('auth.signIn')}</button>
    </LayoutFlex>
  );
}


export default React.memo(TopContainer);
