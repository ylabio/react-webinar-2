import React, { useCallback, useEffect, useState } from 'react'
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import AuthorizationForm from "../../components/authorization-form";
import Tools from "../../containers/tools";
import useStore from "../../hooks/use-store";
import { useLocation, useNavigate } from 'react-router-dom'
import useSelector from '../../hooks/use-selector'
import AuthorizationPanelController
  from '../../components/authorization-panel-controller'


function Authorization() {
    const store = useStore();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const callbacks = {
        getUserToken: useCallback((params) => store.get('user')
          .getUserToken(params)
          .then(
            () => {
              setError(undefined)
              navigate(from, { replace: true });
            },
            (error) => {
                setError(error.message);
            }
          ),
        [])
    }

    const {t} = useTranslate();

    const isAuthorized = useSelector(store => store.user.isAuthorized)

    useEffect(() => {
      if (isAuthorized) {
        navigate(from, { replace: true })
      }
    }, [navigate, isAuthorized])


    return (
        <>
            <AuthorizationPanelController />
            <Layout head={
                <LayoutFlex flex="between">
                    <h1>{t('title')}</h1>
                    <LocaleSelect/>
                </LayoutFlex>
            }>
            <Tools/>
            <AuthorizationForm error={error} onSubmit={callbacks.getUserToken}/>
            </Layout>
        </>
    )
}

export default React.memo(Authorization);
