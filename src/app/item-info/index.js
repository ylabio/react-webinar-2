import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import { useParams } from "react-router-dom"
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import ItemPage from "../../components/item-page";
import Menu from "../../components/menu";
import "./style.css";

function ItemInfo() {

    console.log('ItemInfo');

    const store = useStore();
    const { id } = useParams();
    const cn = bem('ItemInfo');

   useEffect(() => {
       store.get('item').load(id);
       return () => {
           store.get('item').unmount()
       }
   }, [id]);


    const select = useSelector(state => ({
        item: state.item,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(id), []),
    };


    return (
        <>
            {select.item.item ? (
                <Layout head={<h1>{select.item.item.title}</h1>}>
                    <Menu />
                    <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
                   <ItemPage item={ select.item } onAdd={callbacks.addToBasket}/>
                </Layout>
            ) : ""}
        </>
    )
}

export default React.memo(ItemInfo);
