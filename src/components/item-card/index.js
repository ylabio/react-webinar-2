import React, {useCallback, useEffect} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import BasketSimple from "../basket-simple";
import Card from "../card";
import Layout from "../layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import {useParams} from "react-router";


function ItemCard() {
    const cn = bem('ItemCard');
    const store = useStore();
    const {id}=useParams();
    useEffect(() => {
        store.get('card').loadItem(id);
    }, []);


    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum,
        itemById:state.card.itemById
    }));


console.log(id);

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    return (
        <Layout head={<h1>{select.itemById.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
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