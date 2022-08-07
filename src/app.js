import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

    const [activeModal, setActiveModal] = useState(false)

    const callbacks = {
        showModal: useCallback(() => {
            setActiveModal(true)
        }, []),
        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
        onAddBasket: useCallback((item) => {
            store.addInBasket(item)
        }, []),
        onClose: useCallback(() => {
            setActiveModal(false)
        }, [])
    }

    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls showModal={callbacks.showModal} product={store.getState().basket}/>
            <List items={store.getState().items}
                  callBackOnClick={callbacks.onAddBasket}
                  label={'Добавить'}
            />
            <Modal active={activeModal}>
                <Basket basket={store.getState().basket} onClose={callbacks.onClose}
                        onItemDelete={callbacks.onDeleteItems}/>
            </Modal>
        </Layout>
    );
}

export default App;
