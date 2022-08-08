import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Popup from "./components/popup";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const [buttonPopup, setButtonPopup] = useState(false);
    const callbacks = {
        onAddToCart: useCallback((code) => {
            store.addToCart(code);
        }, []),

    }

    return (
        <Layout head={<h1>Приложение на чистом JS</h1>}>
            <Controls cart={store.getState().cart}
                      setButtonPopup={setButtonPopup}
            />
            <List items={store.getState().items}
                  onAddToCart={callbacks.onAddToCart}
            />
            <Popup isOpened = {buttonPopup}
                   setButtonPopup={setButtonPopup}
            />
        </Layout>
    );
}

export default App;
