import Layout from "../layout";
import React, { memo } from "react";
import LoginMenu from "../../../containers/login-menu";
import LayoutFlex from "../layout-flex";
import LocaleSelect from "../../../containers/locale-select";
import propTypes from "prop-types";
import Tools from "../../../containers/tools";

function PageLayout({ children, title }) {
  return (
    <Layout
      head={
        <>
          <LoginMenu />
          <LayoutFlex flex="between">
            <h1>{title}</h1>
            <LocaleSelect />
          </LayoutFlex>
        </>
      }
    >
      <Tools />
      {children}
    </Layout>
  );
}

PageLayout.propTypes = {
  children: propTypes.node,
  title: propTypes.string,
};

PageLayout.defaulProps = {
  title: "",
  children: <></>,
};

export default memo(PageLayout);
