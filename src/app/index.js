import React, {useEffect, useState} from 'react';
import Main from "../pages/main-page";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {Route, Routes} from "react-router";
import Layout from "../components/layout";
import {ItemPage} from "../pages/item-page";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

    console.log('App');

    const modal = useSelector(state => state.modals.name);

    return (
        <>
            <Routes>
                <Route path={''} element={<Layout head={'Магазин'}/>}>
                    <Route index element={<Main/>}/>
                    <Route path={'articles/:id'} element={<ItemPage/>}/>
                </Route>
            </Routes>
            {modal === 'basket' && <Basket/>}
        </>

    );
}

export default React.memo(App);
