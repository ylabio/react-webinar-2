import React from "react";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginTools from "../../containers/login-tools";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function PageTemplate({title, children}) {

  // CSS классы по БЭМ
  const cn = bem('PageTemplate');

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
