import React, {useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import LayoutFlex from "../../components/layout-flex";
import AuthControl from '../../components/auth-control';

function LoginControl() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    logout: useCallback(() => {
      const data = localStorage.getItem('shop');
      if(data) {
        const {token} = JSON.parse(data);       
        store.get('auth').logout(token);
        localStorage.removeItem('shop');
        navigate('/');
      }     
    })
  }

  const {t} = useTranslate();

  return (
    <LayoutFlex flex='end'>
      <AuthControl 
        isLogin={select.auth.authorized}
        logout={callbacks.logout}
        userName={select.auth.profile.name}
        t={t}
      />
    </LayoutFlex>
    
  )
}

export default LoginControl;
