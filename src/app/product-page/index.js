import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import React, {useCallback, useEffect, useState} from "react";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ItemDetails from "../../components/item-details";
import Preload from "../../components/preload";

function ProductPage() {

    console.log('ProductPage');

    const params = useParams()

    const store = useStore();

    useEffect(() => {
        store.get('details').load(params.id);
        return () => {
            store.get('details').setLoading(true);
        }
    }, [])

    useEffect(() => {
        store.get('details').load(params.id);
        return () => {
            store.get('details').setLoading(true);
        }
    }, [params.id])

    const select = useSelector(state => ({
        item: state.details.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        isLoading: state.details.isLoading
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    if (select.isLoading === true) {
        return <Preload/>
    }

    return (
        <Layout head={<h1>{select.item.title}</h1>}>
            <BasketSimple crumbs={'Главная'} onOpen={callbacks.openModalBasket}
                          amount={select.amount} sum={select.sum}/>
            <ItemDetails item={select.item} onAdd={callbacks.addToBasket}/>
        </Layout>
    )
}

export default React.memo(ProductPage);