import React from 'react';
import propTypes from "prop-types";
import Controls from "../controls";
import List from "../list";
import Layout from "../layout";

function Shop(props){
  const items = [];

  props.state.items?.forEach(item =>{
      items.push({code: item.code, title: item.title, details: [item.price.toLocaleString('ru') + " ₽"]});
  })

  return (
    <Layout head={[<h1 key={1}>Магазин</h1>]}>
      <Controls cart={props.state.cart} onButtonEvent={props.onShowCart}/>
      <List items={items} onButtonEvent={props.onAddItem} textButton="Добавить"/>
    </Layout>
  )
}

Shop.propTypes = {
  onShowCart: propTypes.func.isRequired,
  onAddItem: propTypes.func.isRequired,
  state: propTypes.object.isRequired,
}

Shop.defaultProps = {
  onShowCart: () => {},
  onAddItem: () => {},
  state: {}
}

export default React.memo(Shop);
