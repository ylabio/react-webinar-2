import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import CartCounter from "components/cart-counter";

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
            <CartCounter cart={store.getState().cart}/>
            <List items={store.getState().items}
                  onItemDelete={callbacks.onCartDeleteItems}
                  onItemAdd={callbacks.onCartAddItems}
            />
        </Layout>
    );
}

export default App;
