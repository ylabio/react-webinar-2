import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Cart from './components/cart';
import Layout from './components/layout';
import Modal from './components/modal';
import { counter } from './utils';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const callbacks = {
        onAddToCart: useCallback((item) => {
            store.addToCartItem(item);
        }, []),
        onDeleteFromCart: useCallback((code) => {
            store.deleteFromCartItem(code);
        }, []),
        onCartOpen: useCallback(() => {
            setIsCartOpen(true);
        }, []),
        onCartClose: useCallback(() => {
            setIsCartOpen(false);
        }, []),
    };

    return (
        <Layout head={<h1>Магазин</h1>}>
            {isCartOpen && (
                <Modal
                    onClose={() => {
                        setIsCartOpen(false);
                    }}
                >
                    <Cart
                        cart={store.getState().cart}
                        onDeleteFromCart={callbacks.onDeleteFromCart}
                        onCartClose={callbacks.onCartClose}
                    />
                </Modal>
            )}
            <Controls
                onCartOpen={callbacks.onCartOpen}
                totalQuantity={store.getState().cart.totalQuantity}
                totalPrice={store.getState().cart.totalPrice}
            />
            <List
                items={store.getState().items}
                onAddToCart={callbacks.onAddToCart}
                onDeleteFromCart={callbacks.onDeleteFromCart}
            />
        </Layout>
    );
}

export default App;
