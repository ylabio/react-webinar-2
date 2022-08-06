import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

    const callbacks = {
        onDeleteFromCart: useCallback((code) => {
            store.deleteFromCart(code);
        }, []),
        onAddInCart: useCallback((code) => {
            store.addItemInCart(code);
        }, []),
    };

    return (
        <Layout head={<h1>Приложение на чистом JS</h1>}>
            <Controls productCart={store.getState().productCart}
                      onItemDeleteFromCart={callbacks.onDeleteFromCart}
            />
            <List items={store.getState().items}
                  onItemAddInCart={callbacks.onAddInCart}
            />

        </Layout>
    );
}

export default App;
