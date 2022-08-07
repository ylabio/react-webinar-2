import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

    const callbacks = {

        onDeleteItems: useCallback((code) => {
            store.deleteItem(code);
        }, []),
        onAddItems: useCallback((code)=>{
            store.addItem(code);
        }, [])
    };

    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls
                cart={store.getState().cart}
                onItemDelete={callbacks.onDeleteItems}
            />
            <List
                cart={store.getState().cart}
                items={store.getState().items}
                onItemAdd={callbacks.onAddItems}
            />
        </Layout>
    );
}

export default App;