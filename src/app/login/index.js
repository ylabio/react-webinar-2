import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LoginForm from "../../components/login-form";
import Header from "../../containers/header";
import ContentTitle from "../../components/content-title";

function Login() {
	const store = useStore();

  const select = useSelector(state => ({
		isAuth: state.auth.isAuth,
		authError: state.auth.authError
  }));

  const {t} = useTranslate();

	const callbacks = {
    onAuthorization: useCallback((login, password) => store.get('auth').authorization(login, password), []),
  };

  return (
    <Layout head={<Header />}>
      <Tools/>
      <LayoutFlex flex="start" flexDirection="column" alignItems="start" padding="40-20">
				<ContentTitle text={t('login.title')}/>
				<LoginForm isAuth={select.isAuth} authError={select.authError} onAuthorization={callbacks.onAuthorization} t={t}/>
			</LayoutFlex>
    </Layout>
  )
}

export default React.memo(Login);
