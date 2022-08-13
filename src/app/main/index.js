import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback} from "react";
import Item from "../../components/item";

import PaginationBar from "../../components/pagination";

function Main({callbacks, select}){

  console.log('Main');


  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (   
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple callbacks={callbacks} amount={select.amount} sum={select.sum} />
        <List items={select.items} renderItem={renders.item}/>
        <PaginationBar 
          pagination={callbacks.pagination().paginationArray}
          selected={callbacks.pagination().selected}
          onChangePage={callbacks.changePage}/>
      </Layout>
  )
}

export default React.memo(Main);
