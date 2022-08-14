import React, {useState} from 'react';
import Main from "./main";
import Product from "./product";
import Basket from "./basket";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

    console.log('App');

    const modal = useSelector(state => state.modals.name);
    const [idProduct, setIdProduct] = useState('61fcfeae56709c3cee6c408d')

    return (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/" element={<Main setIdProduct={setIdProduct}/>}/>
                <Route path="/product/:id" element={<Product idProduct={idProduct}/>}/>
            </Routes>
            {modal === 'basket' && <Basket setIdProduct={setIdProduct}/>}
        </BrowserRouter>
    );
}

export default React.memo(App);
