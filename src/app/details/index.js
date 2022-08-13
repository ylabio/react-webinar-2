import React, {useCallback, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ItemDetail from "../../components/item-detail/item-detail";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";


function Details() {
    const {id} = useParams();
    const store = useStore();
    const [item, setItem] = useState(null);

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    async function getItem(id) {
        try {
            const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
            const json = await response.json()
            setItem(json.result)
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        if (id) {
            getItem(id)
        }
    }, [id]);

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };


    return (
        <Layout head={<h1>{item?.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} sum={select.sum} amount={select.amount}/>
            <ItemDetail item={item} onAdd={callbacks.addToBasket}/>
        </Layout>
    );
}

export default React.memo(Details)