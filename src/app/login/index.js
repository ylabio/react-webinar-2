import React, { useCallback, useEffect } from "react";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import Form from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate, useLocation } from "react-router-dom";
import ControlBar from "../../containers/control-bar";
import Loader from "../../components/loader";

function Login() {
  const store = useStore();
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.state)
  const callbacks = {
    getToken: useCallback((login, pass) => store.get('auth').login(login, pass), [])
  };
  const error = useSelector(state => state.auth.error);
  const auth = useSelector(state => state.auth.isSigned)
  const { t } = useTranslate();
  useEffect(() => {
    if (auth === true) {
      if (location.state) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }, [auth])

  if (auth !== true && auth !== null) {
    return (
      <>
        <Layout
          overHead={
            <ControlBar />
          }
          head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect />
            </LayoutFlex>
          }>
          <Tools />
          <Form getToken={callbacks.getToken} error={error} />
        </Layout>
      </>
    )
  }
  return (
    <>
      <Loader />
    </>
  )
}

export default React.memo(Login);