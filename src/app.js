import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import CartPopup from "./components/cart-popup";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

export const AddItemContext = React.createContext();
export const DeleteCartItemContext = React.createContext();




function App({store}) {
    const [activePopupCart, setActivePopupCart] = useState(false)

    const callbacks = {
        onAddItemToCart: useCallback((item) => {
            store.addItemToCart({item});

        }, []),
        onDeleteItem: useCallback((item) => {
            store.deleteCartItem(item)
        }, [])
    }


    return (
        <AddItemContext.Provider value={callbacks.onAddItemToCart}>
            <DeleteCartItemContext.Provider value={callbacks.onDeleteItem}>
                <Layout head={<h1>МАГАЗИН</h1>}>
                    <Controls onAdd={callbacks.onAdd}
                              cartItems={store.getState().cartItems}
                              setActivePopupCart={setActivePopupCart}/>
                    <List items={store.getState().items} buttonName={'добавить'}/>

                    {activePopupCart &&
                        <CartPopup
                            setActivePopupCart={setActivePopupCart}
                            cartItems={store.getState().cartItems}>
                            <List items={store.getState().cartItems} buttonName={'удалить'}
                                  countProductCart={'шт'}/>
                        </CartPopup>
                    }

                </Layout>
            </DeleteCartItemContext.Provider>
        </AddItemContext.Provider>)
}

export default App;