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
        onAddToCart: useCallback((code) => {
            store.addToCart(code);
        }, [])
    }

    return (
        <Layout head={<h1>Приложение на чистом JS</h1>}>
            <Controls onAdd={callbacks.onAdd}/>
            <List items={store.getState().items}
                  onTest={callbacks.test}
            />
        </Layout>
    );
}

export default App;
