import React, {useCallback} from 'react';
import useStore from "../../hooks/use-store";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import UserPanel from "../../components/user-panel";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";


function Layout({head, children, logout}){
  const cn = bem('Layout');
  const navigate = useNavigate();
  const store = useStore();
  
  const select = useSelector(state => ({
    user: state.user.user,
    token: state.user.token,
  }));

  const callbacks = {
    // Переход на страницу авторизации
    authPage: useCallback(() => {navigate("../auth");}, []),
    logout: useCallback(() => {
      store.get("user").logout(select.token);
      navigate("../");
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <UserPanel isAuth={select.user ? true : false} userName={select.user ? select.user.profile.name : null} onAuth={callbacks.authPage} onLogout={callbacks.logout}/>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
