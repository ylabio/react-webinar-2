import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Item from "./components/item";
import BasketItem from "./components/basketItem";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const [modalActive, setModalActive] = useState(false);
    const callbacks = {
        onDeleteBasketItem: useCallback((code) => {
            store.deleteBasketItem(code);
        }, []),
        onAddBasketItem: useCallback((code) => {
            store.addBasketItem(code);
        }, []),
    }
    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls totalPrice={store.state.totalPrice} totalCount={store.state.totalCount}
                      setModalActive={setModalActive}/>
            <List items={store.state.items} onAddBasketItem={callbacks.onAddBasketItem} item={Item}/>
            <Modal active={modalActive} setActive={setModalActive} totalPrice={store.state.totalPrice}
                   basket={store.state.basket} deleteItem={callbacks.onDeleteBasketItem}
                   totalCount={store.state.totalCount} item={BasketItem}/>
        </Layout>
    );
}

export default App;
