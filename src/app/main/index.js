import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pages from "../../components/pages";
import Menu from "../../components/menu";

function Main(){

  console.log('Main');
  const store = useStore();
  const [itemsPerPage] = useState(10);

  const select = useSelector(state => ({
    itemsCount: state.catalog.itemsCount,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    activePage: state.catalog.activePage
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (    
    <Layout head={<h1>Магазин</h1>} 
    nav={<Pages state={select} 
    count={Math.ceil(select.itemsCount/itemsPerPage)} 
    perPage={itemsPerPage} />}>
      <BasketSimple onOpen={callbacks.openModalBasket} 
      amount={select.amount} 
      sum={select.sum}>
        <Menu onButtonClick={()=>store.get('catalog').setActive(0)}/>    
      </BasketSimple>
    </Layout>
  )
}

export default React.memo(Main);
