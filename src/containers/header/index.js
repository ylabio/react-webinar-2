import React, {useCallback, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import AuthPanel from "../../components/auth-panel";
import Menu from "../../components/menu";
import propTypes from "prop-types";

function Header(props) {
  const navigate = useNavigate();
  const store = useStore();  

  const select = useSelector(state => ({
    userName: state.auth.user?.profile.name,
    token: state.auth.token,
  }));

  const callbacks = {
    goToLogin: useCallback(() => navigate('/login'), []),
    goToProfile: useCallback(() => navigate('/profile'), []),
    onExit: useCallback(() => store.get('auth').deleteUser(select.token), [])
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: select.userName, link: '/profile'},
    ]), [select.userName]),
  }

  return (
    <>
      <AuthPanel 
        link={select.token ? <Menu items={options.menu}/> : <></>} 
        text={select.token ? "Выход" : "Вход"} 
        onClick={select.token ? callbacks.onExit : callbacks.goToLogin}
      />
      <LayoutFlex flex="between">
        <h1>{props.title}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    </>
  )
}

Header.propTypes = {
  title: propTypes.string
}
  
Header.defaultProps = {
  title: ""
}

export default React.memo(Header);