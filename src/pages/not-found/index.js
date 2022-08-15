import React from "react";
import Layout from "../../components/layout";
import HeaderNotFound from './header';
import TitleNotFOund from './title';
import './style.css';

function NotfFound() {
  return (
    <Layout head={<HeaderNotFound />}>
      <TitleNotFOund />
    </Layout>
  )
}

export default React.memo(NotfFound);