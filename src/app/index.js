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
    const modal = useSelector(state => state.modals.name);

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path={'articles/:id'} element={<ItemPage/>}/>
                </Route>
            </Routes>
            {modal === 'basket' && <Basket/>}
        </>

    );
}

export default App;
