import React, {useCallback, useEffect} from 'react';
import propTypes from 'prop-types';

import BasketSimple from "../basket-simple";
import Card from "../card";
import Layout from "../layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import {useParams} from "react-router";
import Menu from "../menu";



function ItemCard() {
    console.log("ItemCard");

    const store = useStore();
    const {id}=useParams();

    useEffect(() => {
        store.get('card').loadItem(id);

    }, [id]);

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum,
        itemById:state.card.itemById
    }));





    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
        // openItem: useCallback(()=>store.get('card').loadItem(select.itemById),[select.itemById]),

    };

    return (
        <Layout head={<h1>{select.itemById.title}</h1>}>
            <Menu/>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <Card  item={select.itemById} onAdd={callbacks.addToBasket}/>
        </Layout>
    )
}

ItemCard.propTypes = {
    onAdd: propTypes.func,
}

ItemCard.defaultProps = {
    onAdd: () => {},
}

export default React.memo(ItemCard);