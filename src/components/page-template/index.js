import React from "react";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginTools from "../../containers/login-tools";
import propTypes from 'prop-types';

function PageTemplate({title, children}) {

  return (
    <Layout top={
              <LoginTools/>
            }
            head={
              <LayoutFlex flex="between">
                <h1>{title}</h1>
                <LocaleSelect/>
              </LayoutFlex>
            }>
      <Tools/>
      {children}
    </Layout>
  )
}

PageTemplate.propTypes = {
}

PageTemplate.defaultProps = {
}

export default React.memo(PageTemplate);
