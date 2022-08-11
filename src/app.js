import React, {useState, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

    // Состояния для модального окна
    const [showCart, setShowCart] = useState(false);
    const openCart = () => setShowCart(true);
    const closeCart = () => setShowCart(false);

    // Функции добавления и удаления товара
    const callbacks = {
        onAdd: useCallback((code) => {
            store.addCartItem(code);
            store.setTotalPrice();
            store.setTotalCount()
        }, []),
        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
    };

    return (
        <div>
            <Layout head={<h1>Магазин</h1>}>
                <Controls openCart={openCart}
                          totalPrice={store.getState().totalPrice}
                          totalCount={store.getState().totalCount}
                          items={store.getState().items}
                />
                <List items={store.getState().items}
                      onAdd={callbacks.onAdd}
                />
            </Layout>
            {showCart && <Modal head={<h1>Корзина</h1>}
                                closeCart={closeCart}>
                <Cart totalPrice={store.getState().totalPrice}
                      onDeleteItems={callbacks.onDeleteItems}
                      itemsCart={store.getState().cartItems}/>
            </Modal>}
        </div>
    );
}

export default App;
