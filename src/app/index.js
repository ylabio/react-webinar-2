import React, {useCallback, useEffect, useState} from 'react';
import Main from "../pages/main-page";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {Route, Routes, useParams} from "react-router";
import Layout from "../components/layout";
import {ItemPage} from "../pages/item-page";
import {getItemById} from "../api/api";


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
    const store = useStore();
    const modal = useSelector(state => state.modals.name);
    
    useEffect(() => {
        console.log('render');
    })

    useEffect(() => {
        store.get('catalog').loadInit();
    }, [])

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum,
        title: state.catalog.title
    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), [])
    };

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout sum={select.sum} title={select.title} amount={select.amount}
                                                   onOpen={callbacks.openModalBasket}/>}>
                    <Route index element={<Main/>}/>
                    <Route path={'articles/:id'} element={<ItemPage/>}/>
                </Route>
            </Routes>
            {modal === 'basket' && <Basket/>}
        </>

    );
}

export default App;
