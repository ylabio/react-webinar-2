import React, { useLayoutEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import HeaderContainer from "../../containers/header-container";
import FormContainer from "../../containers/form-container";
import useStore from "../../hooks/use-store";

function Login() {

  const {t} = useTranslate();
  const store = useStore();

  useLayoutEffect(() => store.get("auth").resetState(), [store])

  return (
    <Layout header={<HeaderContainer/>}
            head={
              <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
                <LocaleSelect/>
              </LayoutFlex>
            }>

      <Tools/>
      <FormContainer/>

    </Layout>
  )
}

export default React.memo(Login);
