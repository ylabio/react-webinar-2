import React, {useState, useEffect} from 'react';
import Main from "./main";
import Product from "./product";
import Basket from "./basket";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import useSelector from "../utils/use-selector";
import langEn from "../../public/en.json";
import langRu from "../../public/ru.json";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

    console.log('App');

    const modal = useSelector(state => state.modals.name);
    const [idProduct, setIdProduct] = useState('');
    const [lang, setLang] = useState(langEn)
    const [changeLang, setChangeLang] = useState('en')

    useEffect(() => {
        switch (changeLang) {
            case 'ru':
                return setLang(langRu)
            case 'en':
                return setLang(langEn);
            default:
                break;
        }
    }, [changeLang])

    return (
        <BrowserRouter>
            <Routes>
                <Route exact={true} path="/"
                       element={<Main setIdProduct={setIdProduct} lang={lang.main} changeLang={changeLang}
                                      setChangeLang={setChangeLang}/>}/>
                <Route path="/product/:id"
                       element={<Product idProduct={idProduct} lang={lang.product} changeLang={changeLang}
                                         setChangeLang={setChangeLang}/>}/>
            </Routes>
            {modal === 'basket' && <Basket setIdProduct={setIdProduct} lang={lang.basket}/>}
        </BrowserRouter>
    );
}

export default React.memo(App);
