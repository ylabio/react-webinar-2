import React from "react";
import propTypes from "prop-types";
import Controls from "../controls";
import List from "../list";
import Layout from "../layout";

function Shop(props) {

  return (
    <Layout head={[<h1 key={1}>Магазин</h1>]}>
      <Controls cart={props.total} onButtonEvent={props.onShowCart}/>
      <List items={props.items} onButtonEvent={props.onAddItem} textButton="Добавить"/>
    </Layout>
  );
}

Shop.propTypes = {
  onShowCart: propTypes.func.isRequired,
  onAddItem: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
  total: propTypes.object.isRequired,
};

Shop.defaultProps = {
  onShowCart: () => {},
  onAddItem: () => {},
  items: [],
  total: {}
};

export default React.memo(Shop);
