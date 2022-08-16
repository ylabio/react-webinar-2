import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom"
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import ItemPage from "../../components/item-page";
import Menu from "../../components/menu";

function ItemInfo() {

    console.log('ItemInfo');

    const store = useStore();
    const { id } = useParams();

   useEffect(() => {
       store.get('item').load(id);
       return () => {
           store.get('item').unmount()
       }
   }, [id]);


    const select = useSelector(state => ({
        _id: state.item.id,
        title: state.item.title,
        description: state.item.description,
        edition: state.item.edition,
        price: state.item.price,
        country: state.item.country,
        countryCode: state.item.countryCode,
        category: state.item.category,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const { amount, sum, ...data } = select


    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(data), [data]),
    };


    return (
        <>
            { data ? (
                <Layout head={<h1>{data.title}</h1>}>
                    <Menu />
                    <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
                   <ItemPage item={ data } onAdd={callbacks.addToBasket}/>
                </Layout>
            ) : ""}
        </>
    )
}

export default React.memo(ItemInfo);
