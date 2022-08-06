import React, {useCallback, useEffect, useState} from 'react';
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

    const [goodsInCart, setGoodsInCart] = useState([])

    const callbacks = {
        onAddToCart: useCallback((newItem) => {
            let array = [...goodsInCart]
            const index = array.findIndex((item) => item.title === newItem.title)
            if (index !== -1) {
                array[index].count++
                setGoodsInCart(array)
            } else {
                newItem.count = 1
                setGoodsInCart([...goodsInCart, newItem])
            }
        }, [goodsInCart, setGoodsInCart])
    }
    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls goodsInCart={goodsInCart} setGoodsInCart={setGoodsInCart}/>
            <List items={store.getState().items}
                  onAddToCart={callbacks.onAddToCart}
            />
        </Layout>
    );
}

export default App;
