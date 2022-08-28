import React, {useCallback} from "react";
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Button from "../../components/button";
import CustomLink from "../../components/custom-link";


function TopContainer() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.get('session').signOut();
    }, [location.pathname]),
  };

  return (
    <LayoutFlex flex="end" indent="small">
      {select.exists && <CustomLink link={"/profile"} text={select.user.profile.name}/>}
      {select.exists
        ? <Button onClick={callbacks.onSignOut} text={t('session.signOut')} type={'profileSimple'}/>
        : <Button onClick={callbacks.onSignIn} text={t('session.signIn')} type={'profileSimple'}/>
      }
    </LayoutFlex>
  );
}

export default React.memo(TopContainer);
