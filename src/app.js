import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Item from "./components/item";
import BasketTotal from "./components/basket-total";
import BasketList from "./components/basket-list";
import BasketItem from "./components/basket-item";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const isModalActive = store.state.modals[0].active
    const callbacks = {
        onDeleteBasketItem: useCallback((code) => {
            store.deleteBasketItem(code);
        }, []),
        onAddBasketItem: useCallback((code) => {
            store.addBasketItem(code);
        }, []),
        onChangeModal: useCallback((code) => {
            store.changeModelItem(code);
        }, []),
    }
    return (
        <>
            <Layout head={<h1>Магазин</h1>}>
                <Controls modal={store.state.modals[0]} setModalActive={callbacks.onChangeModal}
                          totalPrice={store.state.totalPrice} totalCount={store.state.totalCount}/>
                <List items={store.state.items} onAddBasketItem={callbacks.onAddBasketItem}>
                    {Item}
                </List>
            </Layout>
            {
                isModalActive &&
                <Modal head={<h1>Корзина</h1>} modal={store.state.modals[0]} setModalActive={callbacks.onChangeModal}>
                    <BasketList basket={store.state.basket} deleteItem={callbacks.onDeleteBasketItem}>
                        {BasketItem}
                    </BasketList>
                    <BasketTotal totalCount={store.state.totalCount} totalPrice={store.state.totalPrice}/>
                </Modal>
            }
        </>
    );
}

export default App;
