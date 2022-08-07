import React, {useCallback} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const callbacks = {
        onCartAddItems: useCallback((item) => {
            store.addCartItem(item);
        }, []),
        onCartDeleteItems: useCallback((code) => {
            store.deleteCartItem(code);
        }, []),
    };

    return (
        <Layout head={<h1>Приложение на чистом JS</h1>}>
            <Cart cart={store.getState().cart}
                  onItemDelete={callbacks.onCartDeleteItems}
            />

            <List items={store.getState().items}
                  onItemAdd={callbacks.onCartAddItems}
                  inCart={false}
            />
        </Layout>
    );
}

export default App;
