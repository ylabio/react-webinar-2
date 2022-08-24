import React, {useCallback, useEffect} from "react";
import { useNavigate } from "react-router";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useToken from "../../hooks/use-token";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginControl from "../../components/login-control";
import ProfileCard from "../../components/profile-card";
import select from "../../components/select";



function Profile(){
    const store = useStore();
    const navigate = useNavigate();
    const {t} = useTranslate();

    useToken()

    const select = useSelector(state => ({
        user: state.profile.data,
        autorization: state.autorization.autorization
      }));

      useEffect(() => {
        if (!select.autorization) {
          navigate("/login", { replace: true });
        }
      }, [select.autorization])
    
    const callbacks = {
        onLogOut: useCallback(() => store.get('autorization').logOut(), []),
    };

    return(
        <>
          <LoginControl 
            t={t} 
            userName={select.user.profile ? select.user.profile.name : null}
            onLogOut={callbacks.onLogOut}
          />
          <Layout head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
            }>
            <Tools/>
            <ProfileCard profile={select.user} t={t}/>
          </Layout>
        </>
        
    )
}

export default React.memo(Profile)