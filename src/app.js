import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import {Overlay} from "./components/overlay";
import {CartModal} from "./components/modal";
import {ModalContentCart} from "./components/modal-content-cart";
import {Header} from "./components/header";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const callbacks = {
        onSelectItems: useCallback((code) => {
            store.addToCart(code)
        }, [])
    }

    const removeCallback = {
        onRemoveItems: useCallback((code) => {
            store.removeFromCart(code);
        }, [])
    }


    const [isOpen, setIsOpen] = useState(false);

    const removeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            <Layout head={<h1>Магазин</h1>}>
                <Header count={store.getState().count} price={store.getState().price} openModal={openModal}/>
                <List type={'main'} items={store.getState().items}
                      onItemSelect={callbacks.onSelectItems}
                />
            </Layout>
            {isOpen ?
                <Overlay isOpened={isOpen} closeModal={removeModal}>
                    <CartModal closeModal={removeModal} title='Корзина'>
                        <ModalContentCart price={store.getState().price} count={store.getState().count}
                                          callback={removeCallback.onRemoveItems} list={store.getState().cart}/>
                    </CartModal>
                </Overlay>
                : null
            }
        </>
    );
}

export default App;
