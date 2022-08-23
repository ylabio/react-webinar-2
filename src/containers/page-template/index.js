import React from "react";
import Tools from "../tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../locale-select";
import LoginTools from "../login/login-tools";
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
  title: propTypes.string,
  children: propTypes.node
}

PageTemplate.defaultProps = {
  title: '',
  children: ''
}

export default React.memo(PageTemplate);
