import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {Cart} from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

    const [cartActive, setCartActive] = useState(false)

    const callbacks = {
        onCart: useCallback(() => {
            setCartActive(true)
        }, []),
        onAddItems: useCallback((item) => {
            store.addItemToCart(item);
        }, []),
        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
        uniqueCartItems: useCallback((cartItems) => {
            let result = [];
            for (let i of cartItems) {
                if (!result.includes(i)) {
                    result.push(i);
                }
            }
            return result;
        }, [])
    }

    let count = callbacks.uniqueCartItems(store.getState().cartItems).length
    let sum = store.getState().cartItems.reduce((sum, item ) => sum + item.price, 0)


    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls onCart={callbacks.onCart} count={count} sum = {sum}/>
            <List items={store.getState().items}
                  onItemAdd={callbacks.onAddItems}
            />
            {cartActive && (
                <Cart
                    uniqueCartItems={callbacks.uniqueCartItems}
                    cartsItems={store.getState().cartItems}
                    onDelete={callbacks.onDeleteItems}
                    setActive={setCartActive}
                    sum={sum}/>)
            }
        </Layout>
    );
}

export default App;
