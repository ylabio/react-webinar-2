import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";



/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    const [openedModal, setOpenedModal]=useState(false);


    const callbacks = {
        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
        onAddItems: useCallback((code)=>{
            store.addItem(code);
        }, []),
        closeModal:useCallback(()=>{
            setOpenedModal(false)
        }, []),
        openModal:useCallback(()=>{
            setOpenedModal(true)
        }, []),
    };
    // console.log(store.getState().amount);
    // console.log(store.getState().cart);
    return (
        <React.Fragment>
            <Layout head={<h1>Магазин</h1>}>
                <Controls
                    openModal={callbacks.openModal}
                    amount={store.getState().amount}
                    lengthCart={store.getState().cartLength}
                />
                <List
                    items={store.getState().items}
                    onItemAdd={callbacks.onAddItems}
                />
            </Layout>
            {openedModal &&
                <Modal
                    items={store.getState().items}
                    closeModal={callbacks.closeModal}
                    cart={store.getState().cart}
                    onItemDelete={callbacks.onDeleteItems}
                    amount={store.getState().amount}
                    lengthCart={store.getState().cartLength}
                />
            }
        </React.Fragment>
    );
}

export default App;