import Layout from "../layout";
import React from "react";
import propTypes from "prop-types";
import "./style.css";

function Card({}) {
  return (
    <>
      <Layout head={<h1>Корзина</h1>}></Layout>
    </>
  );
}

export default React.memo(Card);
