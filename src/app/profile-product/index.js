import React, { useCallback, useEffect, useState } from 'react';
import { cn as bem } from "@bem-react/classname";
import { Outlet, useNavigate } from "react-router-dom";
import './styles.css';

import useStore from '../../utils/use-store';

import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import useSelector from '../../utils/use-selector';


export const ProfileProduct = () => {

    const store = useStore();
    const cn = bem('ProfileProduct');

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

    let navigate = useNavigate()

    return (

        <>

            <Layout head={<h1>{ select.item.title}</h1>}>
                <div className={cn('hader')} >
                    <section
                        className={cn('home-link')}
                        onClick={() => navigate(`/`)}
                    >
                        Главная
                    </section>
                    <BasketSimple onOpen={callbacks.openModalBasket}
                        amount={select.amount} sum={select.sum} />
                </div>
                
                <Outlet context={{
                    setId: setId,
                    onAdd: callbacks.onAdd,
                    item: select.item,
                }} />
            </Layout>
        </>

    )
}
