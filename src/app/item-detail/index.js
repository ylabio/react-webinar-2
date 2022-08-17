import React, {useCallback, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import {useParams} from "react-router-dom"
import BasketSimple from '../../components/basket-simple';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Layout from '../../components/layout';
import ItemDetailInfo from '../../components/item-detail-info';
import numberFormat from "../../utils/numberFormat";
import NavBar from "../../components/navbar";
import Menu from "../../components/menu";

function ItemDetail() {
  const {id} = useParams();
  
  const store = useStore();
  useEffect(()=>{
    store.get('itemdetail').load(id);
    store.get('modals').close()
  },[id]);
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    
    onAdd: useCallback((e) => store.get('basket').addToBasket(id), [])
  };
  

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    country: state.itemdetail.country,
    category: state.itemdetail.category,
    item: state.itemdetail.item
  }));

  return (
    <>
      <Layout head={<h1>{select.item?.title}</h1>}>
        <NavBar>
          <Menu links={[{name: 'Главная', path: '/'}]}/>
          <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </NavBar>
        <ItemDetailInfo item={select.item} 
                        country={select.country} 
                        category={select.category} 
                        onAdd={callbacks.onAdd}/>
      </Layout>
    </>
  )
}

export default React.memo(ItemDetail);
