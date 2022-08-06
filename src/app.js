import React, {useState, useEffect, useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";

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

    // Расчет общей суммы и общего количества товаров добавленных в корзину
    const totalPrice = store.getState().cartItems.reduce((sum, item) => {
        return item.price * item.count + sum
    }, 0);
    const totalCount = store.getState().cartItems.reduce((sum, item) => {
        return item.count + sum
    }, 0);

    // Функции добавления и удаления товара
    const callbacks = {
        onAdd: useCallback((code) => {
            store.addCartItem(code);
        }, []),
        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
    }

    return (
        <Layout head={<h1>Магазин</h1>}>
            {showCart && <Cart closeCart={closeCart}
                               totalPrice={totalPrice}
                               onDeleteItems={callbacks.onDeleteItems}
                               itemsCart={store.getState().cartItems}/>}
            <Controls openCart={openCart}
                      totalPrice={totalPrice}
                      totalCount={totalCount}
                      items={store.getState().items}
            />
            <List items={store.getState().items}
                  onAdd={callbacks.onAdd}
            />
        </Layout>
    );
}

export default App;
