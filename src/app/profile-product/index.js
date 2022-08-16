import React, { useCallback, useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import useStore from '../../utils/use-store';

import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import useSelector from '../../utils/use-selector';
import ProfileHeader from '../../components/profile-peader';


export const ProfileProduct = () => {

    const store = useStore();


    const [id, setId] = useState(false)

    useEffect(() => {
        if (id) {
            store.get('item').loadProductById(id)
        }
    }, [id])

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
        item: state.item,
    }));


    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
        // Добавление в корзину
        onAdd: useCallback(id => store.get('basket').addToBasket(id), []),
    };


    return (

        <>

            <Layout head={<h1>{select.item.title}</h1>}>
                <ProfileHeader>
                    <BasketSimple onOpen={callbacks.openModalBasket}
                        amount={select.amount} sum={select.sum} />
                </ProfileHeader>

                <Outlet context={{
                    setId: setId,
                    onAdd: callbacks.onAdd,
                    item: select.item,
                }} />
            </Layout>
        </>

    )
}
