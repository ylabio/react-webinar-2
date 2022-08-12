import React, {useCallback, useState} from 'react';
import './style.css';
import Layout from "./components/layout";
import Controls from "./components/controls";
import List from "./components/list";
import CartPopup from "./components/cart-popup";
import TotalPriceCart from "./components/total-price-cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

export const AddItemContext = React.createContext();
export const DeleteCartItemContext = React.createContext();

function App({store}) {
    const state = store.getState()
    const [activePopupCart, setActivePopupCart] = useState(false)


    const callbacks = {
        onAddItemToCart: useCallback((item) => {
            store.addItemToCart({item});

        }, []),
        onDeleteItem: useCallback((item) => {
            store.deleteCartItem(item)
        }, []),
    }

    return (
        <AddItemContext.Provider value={callbacks.onAddItemToCart}>
            <DeleteCartItemContext.Provider value={callbacks.onDeleteItem}>
                <Layout head={
                    <h1>МАГАЗИН</h1>
                }>
                    <Controls totalItemCount={state.totalItemCount}
                              setActivePopupCart={setActivePopupCart}
                              buttonName={'Перейти'}
                              totalPrice={state.totalPrice}
                              onClick={() => setActivePopupCart(true)}/>

                    <List items={state.items}
                          buttonName={'Добавить'}/>
                </Layout>

                {activePopupCart &&
                    <CartPopup>
                        <Layout head={<h1>КОРЗИНА</h1>}
                                activePopupCart={activePopupCart}
                                setActivePopupCart={setActivePopupCart}>
                            {activePopupCart ? ''
                                : <Controls
                                    cartItems={state.cartItems}
                                    onClick={() => setActivePopupCart(false)}
                                    activePopupCart={activePopupCart} buttonName={'Закрыть'}
                                />}

                            <List items={state.cartItems}
                                  buttonName={'Удалить'}
                                  countProductCart={'шт'}/>
                            <TotalPriceCart totalPrice={state.totalPrice}/>

                        </Layout>
                    </CartPopup>}

            </DeleteCartItemContext.Provider>
        </AddItemContext.Provider>)
}

export default App;
