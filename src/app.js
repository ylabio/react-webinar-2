import React, {useCallback, useEffect, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {Overlay} from "./components/overlay";
import {CartModal} from "./components/modal";
import {Header} from "./components/header";
import {product} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const callbacks = {
        onSelectItems: useCallback((code, title, price, counter) => {
            store.addToCart(code, title, price, counter)
        }, [])
    }

    const removeCallback = {
        onRemoveItems: useCallback((code) => {
            store.removeFromCart(code);
        }, [])
    }

    const getPriceCallback = {
        getFullPrice: useCallback(() => {
            return store.getFullPrice();
        }, [])
    }

    const getCountCallback = {
        getCount: useCallback(() => {
            return store.getCount();
        }, [])
    }


    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);

    const removeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        setCount(store.state.cart.length);
    }, [store.state.cart.length])


    return (
        <>
            <Layout head={<h1>Магазин</h1>}>
                <header className={'Header'}>
                    <p className={('Header-cart')}>
                        В корзине:
                    </p>

                    {count > 0 ?
                        <b>
                            {count} {product(count)} / {store.getFullPrice().toLocaleString()} ₽

                        </b> : <b>
                            пусто
                        </b>

                    }
                    <Controls title='Перейти' onAdd={() => openModal()}/>
                </header>
                <List items={store.getState().items}
                      onItemSelect={callbacks.onSelectItems}
                />
            </Layout>
            {isOpen ?
                <Overlay isOpened={isOpen} closeModal={removeModal}>
                    <CartModal itemFunc={removeCallback.onRemoveItems} closeModal={removeModal} title='Корзина'
                               items={store.getState().cart}/>
                </Overlay>
                : null
            }
        </>
    );
}

export default App;
