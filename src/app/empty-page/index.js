import React from "react";
import Layout from "../../components/layout";
import Menu from "../../components/menu";
import NotFound from "../../components/not-found";


function EmptyPage() {

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu/>
      <NotFound/>
    </Layout>
  )
}

export default EmptyPage;